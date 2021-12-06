import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function HomeScreen ({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <View>
        <StatusBar style='auto' />

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
