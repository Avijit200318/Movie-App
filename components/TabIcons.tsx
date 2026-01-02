import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Hilight from "@/assets/images/highlight.png";

const TabIcons = ({ text, iconName, focused }: { text: string, iconName: any, focused: any }) => {
    return (
        <>
            {focused ?
                <ImageBackground
                    source={Hilight}
                    className="flex flex-row w-full min-w-[110px] h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
                >
                    <Ionicons size={18} name={iconName} />
                    <Text className="text-secondary text-base font-semibold ml-2">
                        {text}
                    </Text>
                </ImageBackground> :
                <View className="size-full justify-center items-center mt-4 rounded-full">
                    <Ionicons size={22} name={iconName} color={"white"} />
                </View>
            }
        </>
    )
}

export default TabIcons