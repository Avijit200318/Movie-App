import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const MovieCard = ({item}: Movie) => {
  return (
    <Link href={`/movies/${item.id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image source={{
                uri: item.poster_path? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            resizeMode='cover' 
            className='w-full h-52 rounded-lg' />
            <Text className='text-white font-bold text-sm mt-2' numberOfLines={1}>{item.title}</Text>
            <View className='flex-row justify-start items-center gap-x-1'>
                <Ionicons name='star-sharp' color={"yellow"} />
                <Text className='text-white text-xs font-bold uppercase'>{(item.vote_average / 2).toFixed(1)}</Text>
            </View>
            <View className='flex-row justify-between items-center'>
                <Text className='text-xs text-light-300 font-medium mt-1'>{item.release_date?.split('-')[0]}</Text>
                <Text className='text-xs text-light-300 font-medium mt-1'>Movie</Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard