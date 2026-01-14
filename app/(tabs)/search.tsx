import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from "@/assets/images/home logo.png"
import Img from "@/assets/images/bg.png"
import useFetch from '@/services/useFetch'
import { fetchPopularMovies } from '@/services/api'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'

const Search = () => {

  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchPopularMovies({
    query: searchQuery
  }), false);
  // we don't want auto fetch so we set false

  useEffect(() => {
    // implement debouncing

    const timeoutId = setTimeout(async() => {
      if (searchQuery.trim()) {
        await loadMovies();

        if(movies && (movies as Movie[]).length > 0 && movies?.[0]){
          await updateSearchCount(searchQuery, movies[0]);
        }

      } else{
        reset();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);


  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <Image source={Img} className="flex-1 absolute w-full z-0" resizeMode='cover' />
      <FlatList data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard item={item} />
        )}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 19,
          paddingRight: 5,
          marginBottom: 10
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center items-center mt-20'>
              <Image source={Logo} className='w-12 h-10' />
            </View>
            <View className='my-5 mx-2'>
              <SearchBar placeholder='Search movies...' value={searchQuery} onChangeText={(text: string) => setSearchQuery(text)} />
            </View>

            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className='my-3' />
            )}

            {moviesError && (
              <Text className='text-red-500 px-5 my-3'>
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold px-1 mb-3'>
                Search Result for{' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          (!moviesLoading && !moviesError) ? (
            <View className='mt-5 px-5'>
              <Text className='text-center text-gray-500 text-xl'>
                {searchQuery.trim()? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  )
}

export default Search