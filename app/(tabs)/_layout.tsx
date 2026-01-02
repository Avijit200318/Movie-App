import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Text } from 'react-native';
import TabIcons from '@/components/TabIcons';

const _layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                justifyContent: "center",
                alignItems: "center",
                marginTop: 0
            },
            tabBarStyle: {
                backgroundColor: "#0f0D23",
                borderRadius: 50,
                height: 52,
                marginBottom: 40,
                marginHorizontal: 8,
                position: "absolute",
                overflow: "hidden",
                borderColor: "#0f0d23",
                borderTopWidth: 0,
                paddingVertical: 6
            }
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: "Home", headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcons text={"Home"} iconName={"home-outline"} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: "Search", headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcons text={"Search"} iconName={"search"} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='saved'
                options={{
                    title: "Saved", headerShown: false,
                    tabBarIcon: ({ focused }) => 
                    <TabIcons text={"Saved"} iconName={"bookmark-outline"} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile", headerShown: false,
                    tabBarIcon: ({ focused }) => 
                    <TabIcons text={"Saved"} iconName={"people"} focused={focused} />
                }}
            />
        </Tabs>
    )
}

export default _layout