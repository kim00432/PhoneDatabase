import React from 'react'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
  DrawerActions
} from '@react-navigation/native'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  SafeAreaView
} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Sidebar from './customDrawer'
import HomeScreen from './screens/HomeScreen'
import Details from './screens/Details'
import Favorites from './screens/Favorites'

//root navigator - Drawer Navigator
export default function App () {
  const Drawer = createDrawerNavigator()
  // const navigation = useNavigation()
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Home'
        drawerContent={props => <Sidebar {...props} />}
        screenOptions={({ navigation }) => ({
          headerLeft: ({ color }) => (
            <Pressable
              onPress={() => {
                navigation.toggleDrawer()
              }}
            >
              <Ionicons
                name='reorder-two-outline'
                size={34}
                color={color}
                style={{ marginLeft: 12 }}
              />
            </Pressable>
          ),
          headerShadowVisible: false,
          presentation: 'card',
          drawerType: 'slide',
          overlayColor: '#00000033'
        })}
      >
        <Drawer.Screen name='Home' component={HomeStackNav} />
        <Drawer.Screen name='Favorites' component={Favorites} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

//HomeScreen navigator - Stack Navigator (for HomeScreen & Details)
function HomeStackNav () {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Details'
        component={Details}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
