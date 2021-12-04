import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default function Phone ({ navigation }) {
  return (
    <View>
      <Text>Details</Text>
      <Button onPress={() => navigation.goBack()} title='Go back home' />
    </View>
  )
}
