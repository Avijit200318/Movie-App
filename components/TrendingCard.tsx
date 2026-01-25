import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import MaskedView from "@react-native-masked-view/masked-view";
import Img from "@/assets/images/rankingGradient.png";

const TrendingCard = ({ item, index }: { item: TrendingMovie, index: number }) => {
    return (
        <Link href={`/movies/${item.movie_id}`} asChild>
            <TouchableOpacity className="w-32 relative pl-5">
                <Image
                    source={{ uri: item.poster_url }}
                    className="w-32 h-48 rounded-lg"
                    resizeMode="cover"
                />

                <View className="absolute bottom-9 -left-3 px-2 py-1 rounded-full">
                    <MaskedView
                        maskElement={
                            <Text className="font-bold text-white text-5xl">{index + 1}</Text>
                        }
                    >
                        <Image
                            source={Img}
                            className="size-12"
                            resizeMode="cover"
                        />
                    </MaskedView>
                </View>

                <Text
                    className="text-sm font-bold mt-2 text-light-200"
                    numberOfLines={2}
                >
                    {item.title}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard