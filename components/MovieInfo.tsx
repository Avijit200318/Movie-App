import { View, Text } from 'react-native'
import React from 'react'

const MovieInfo = ({label, value}: {label: string, value: string | number | null | undefined}) => {
  return (
    <View className='flex-col items-start justify-center mt-5'>
        <Text className='text-lime-200 text-sm font-normal'>{label}</Text>
        <Text className='text-lime-200 text-sm font-bold mt-2'>{value || 'N/A'}</Text>
    </View>
  )
}

export default MovieInfo