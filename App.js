import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import Phone from './screens/Phone'
import HomeScreen from './screens/HomeScreen'
const Drawer = createDrawerNavigator()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)'
  }
}

export default function App () {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator initialRouteName='HomeScreen'>
        <Drawer.Screen name='Home' component={HomeScreen} />
        <Drawer.Screen name='Phone' component={Phone} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
