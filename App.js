import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import Phone from './screens/Phone'
import HomeScreen from './screens/HomeScreen'
const Drawer = createDrawerNavigator()
import { Ionicons } from '@expo/vector-icons'

export default function App () {
  return (
    <NavigationContainer theme={DrawerTheme}>
      <AppDrawer />
    </NavigationContainer>
  )
}

function AppDrawer () {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Ionicons name='md-home' size={size} color={color} />
            } else {
              return (
                <Ionicons name='md-home-outline' size={size} color={color} />
              )
            }
          }
        }}
      />
      <Drawer.Screen
        name='Details'
        component={Phone}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Ionicons name='list' size={size} color={color} />
            } else {
              return <Ionicons name='list-outline' size={size} color={color} />
            }
          }
        }}
      />
    </Drawer.Navigator>
  )
}

const DrawerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)'
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
