// step32: start by doing "rnfe" here below and changed name to TabsLayout now here below.
import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabsLayout = () => {
  return (
    // step33: now lets return a component called "tabs" coming from the "expo-router" package here below.
    <Tabs

    // step34: it takes a "screenOptions" prop to give a screen options to each screen ; and we can use it to give a title to each screen here below ; for now lets leave it empty here below.
    screenOptions={{
        // step43: now we can change the color or pass the color to be used there here below using the syntax here below.
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "green",

        // step44: we can also use the "tabBarStyle" prop to change the style of the whole navigation tabs here below.
        tabBarStyle: {
            backgroundColor: "#1e293b",

            // step45: now we set a top border of width 1px and a color here below.
            borderTopWidth: 1,
            borderTopColor: "magenta",
            height:90,
            paddingBottom: 30,
            paddingTop: 10,
        },

        // step46: now lets use the "tabBarLabelStyle" prop to change the style of the title OR text of the navigation tabs here below.
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
        },
        // step47: now we can make the heading being shown for the screen to be hidden too here below ; same do in root's _layout.tsx file too , but it will make for now the contnent to overflow with the top status bar of the mobile there ; so we'll see how to fix it later.
        headerShown: false
    }}
    >

        {/* step35: now lets pass the Tabs.Screen component here below which will represent the two screens of the two tabs here below. */}
        <Tabs.Screen
            name='index' // this should match the name of file for that screen saved in vs code here below.
            options={{
                // step36: lets give the title of the navigation tab here below.
                title: "Tasks",

                // step37: now we will also have an icon on the navigation tab here below.

                // step38: lets say this is a function that will take color and size as props ; and return an icon component ; and we can use it to give an icon to each navigation tab here below.
                tabBarIcon: ({color, size}) => (

                    // step39: lets use the icons from the "ionicons" package here below.

                    // step40: for the tasks tab , lets use the "flash-outline" icon here below.

                    // step41: can give color and size to them using the props passed , which gives the default size and color to them here below ; we can manually change them too by doing like : size={24} color={"magenta"} and so on....
                    <Ionicons name= 'flash' size={size} color={color} />
                )
            }}
        />

        {/* step42: now similarly lets add the navigation tab for the settings screen here below. */}
        <Tabs.Screen
            name='settings' // this should match the name of file for that screen saved in vs code here below.
            options={{
                title: "Settings",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name= 'settings' size={size} color={color} />
                )
            }}
        />

    </Tabs>
  )
}

export default TabsLayout