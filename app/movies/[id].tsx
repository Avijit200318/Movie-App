import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { Ionicons } from '@expo/vector-icons'
import MovieInfo from '@/components/MovieInfo'

const MovieDetails = () => {
  // destructure the id
  const { id } = useLocalSearchParams();

  const { data: movie, loading: movieFetchLoading, error: moviesFetchError } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 40 }}>
        {movieFetchLoading && (
          <ActivityIndicator size="large" className="w-16 h-16 mt-20 mb-5 mx-auto" />
        )}

        {!movieFetchLoading && !moviesFetchError && (
          <View>
            <View>
              <Image source={{
                uri: movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
              }}
                className='w-full h-[500px]' resizeMode='stretch'
              />
            </View>
            <View className='flex-col items-start justify-center px-5 mt-5'>
              <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
              <View className='flex-row items-center gap-x-1 mt-2'>
                <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
                <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
              </View>
              <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                <Ionicons name='star-sharp' color={"yellow"} />
                <Text className='text-white text-xs font-bold uppercase'>{Math.round(movie?.vote_average as number)}/10</Text>
                <Text className='text-light-200 text-sm'>({movie?.vote_count} votes)</Text>
              </View>

              <MovieInfo label='Overview' value={movie?.overview} />

              <MovieInfo label='Genres' value={movie?.genres?.map((g) => g.name).join(' - ') || 'N/A'} />
              <View className='flex flex-row w-1/2 justify-between'>
                <MovieInfo label='Budget' value={`$${movie?.budget as number / 1_000_000} million`} />
                <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue as number / 1_000_000)} million`} />
              </View>
              <MovieInfo label='Production Companies' value={movie?.production_companies.map((c) => c.name).join(' - ') || 'N/A'} />

            </View>
          </View>
        )}

        <TouchableOpacity className='mx-5 mt-12 bg-accent rounded-lg py-3.5 flex flex-row justify-center items-center z-50' onPress={router.back}>
          <Ionicons name='arrow-back' className='mr-2' color={'white'} size={20}/>
          <Text className='text-white font-semibold'>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MovieDetails