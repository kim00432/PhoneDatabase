import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
  DrawerActions
} from '@react-navigation/native'

import Phone from './screens/Phone'
import HomeScreen from './screens/HomeScreen'
import Favorites from './screens/Favorites'
import Sidebar from './customDrawer'
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
  // top-level state data being passed to screens
  const [phoneDetails, setPhoneDetails] = useState([])
  const [phoneURL, setPhoneURL] = useState([])
  const [phoneResults, setPhoneResults] = useState([])
  const [phoneModel, setPhoneModel] = useState('iPhone 12')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const navigation = useNavigation()

  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerLeft: ({ color }) => (
          <Pressable
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer())
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
      }}
    >
      <Drawer.Screen
        name='Home'
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
      >
        {props => (
          <HomeScreen
            {...props}
            phoneDetails={phoneDetails}
            setPhoneDetails={setPhoneDetails}
            phoneURL={phoneURL}
            setPhoneURL={setPhoneURL}
            phoneResults={phoneResults}
            setPhoneResults={setPhoneResults}
            phoneModel={phoneModel}
            setPhoneModel={setPhoneModel}
            isRefreshing={isRefreshing}
            setIsRefreshing={setIsRefreshing}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name='Details'
        options={{
          drawerIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <Ionicons name='phone-portrait' size={size} color={color} />
              )
            } else {
              return (
                <Ionicons
                  name='phone-portrait-outline'
                  size={size}
                  color={color}
                />
              )
            }
          }
        }}
      >
        {props => (
          <Phone
            {...props}
            phoneDetails={phoneDetails}
            setPhoneDetails={setPhoneDetails}
            phoneURL={phoneURL}
            setPhoneURL={setPhoneURL}
            phoneResults={phoneResults}
            setPhoneResults={setPhoneResults}
            phoneModel={phoneModel}
            setPhoneModel={setPhoneModel}
            isRefreshing={isRefreshing}
            setIsRefreshing={setIsRefreshing}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name='Favorites'
        options={{
          drawerIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Ionicons name='heart-sharp' size={size} color={color} />
            } else {
              return <Ionicons name='heart-outline' size={size} color={color} />
            }
          }
        }}
      >
        {props => (
          <Favorites
            {...props}
            phoneDetails={phoneDetails}
            setPhoneDetails={setPhoneDetails}
            phoneURL={phoneURL}
            setPhoneURL={setPhoneURL}
            phoneResults={phoneResults}
            setPhoneResults={setPhoneResults}
            phoneModel={phoneModel}
            setPhoneModel={setPhoneModel}
            isRefreshing={isRefreshing}
            setIsRefreshing={setIsRefreshing}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
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

/* Editing default drawer theme */
const DrawerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)'
  }
}
