import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Pressable } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Sidebar from './customDrawer'
import HomeScreen from './screens/HomeScreen'
import Details from './screens/Details'
import Favorites from './screens/Favorites'

import { PhonesProvider } from './context/PhonesContext'

//root navigator - Drawer Navigator
export default function App () {
  const Drawer = createDrawerNavigator()
  // const navigation = useNavigation()
  return (
    <PhonesProvider>
      <AppContainer />
    </PhonesProvider>
  )
}

function AppContainer () {
  const Drawer = createDrawerNavigator()
  // const navigation = useNavigation()
  return (
    <NavigationContainer theme={DrawerTheme}>
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
        <Drawer.Screen
          name='Home'
          component={HomeStackNav}
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
          name='Favorites'
          component={Favorites}
          options={{
            drawerIcon: ({ focused, color, size }) => {
              if (focused) {
                return <Ionicons name='heart-sharp' size={size} color={color} />
              } else {
                return (
                  <Ionicons name='heart-outline' size={size} color={color} />
                )
              }
            }
          }}
        />
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

/* Editing default drawer theme */
const DrawerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)'
  }
}
