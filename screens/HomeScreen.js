import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default function HomeScreen ({ navigation }) {
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
