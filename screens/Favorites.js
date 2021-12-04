import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default function Favorites ({ navigation }) {
  return (
    <View>
      <Text>Favorites</Text>
      <Button onPress={() => navigation.goBack()} title='Go back home' />
    </View>
  )
}
