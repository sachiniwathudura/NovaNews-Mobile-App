import React from 'react'
import { Tabs } from 'expo-router'
import {TabBar} from "../../components/TabBar";
import headerShownContext from "@react-navigation/elements/src/Header/HeaderShownContext";

const TabLayout = () => {
    return (
        <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{headerShown:false}}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: "login",
                }}
            />
            <Tabs.Screen
                name="signup"
                options={{
                    title: "signup",
                }}
            />
            <Tabs.Screen
                name="discover"
                options={{
                    title: "Discover",
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                }}
            />
        </Tabs>
    )
}

export default TabLayout