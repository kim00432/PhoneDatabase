import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
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

function HomeScreen ({ navigation }) {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        onPress={() => navigation.navigate('Phone')}
        title='Go to Phone'
      />
    </View>
  )
}

function Phone ({ navigation }) {
  return (
    <View>
      <Text>Phone</Text>
      <Button onPress={() => navigation.goBack()} title='Go back home' />
    </View>
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
