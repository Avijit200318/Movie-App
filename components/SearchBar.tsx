import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  placeholder: string,
  onPress?: () => void,
  value: string,
  onChangeText: (text: string) => void
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-2'>
      <Ionicons size={18} name="search" color="#ab8bff" />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar