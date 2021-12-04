import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default function HomeScreen ({ navigation }) {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        onPress={() => navigation.navigate('Details')}
        title='Go to Phone'
      />
      <Button
        onPress={() => navigation.navigate('Favorites')}
        title='Go to Favorites'
      />
    </View>
  )
}
