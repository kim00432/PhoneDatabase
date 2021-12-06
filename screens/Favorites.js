import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function Favorites ({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <View>
        <StatusBar style='auto' />
        <Text>Favorites</Text>
        <Button onPress={() => navigation.goBack()} title='Go back home' />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
