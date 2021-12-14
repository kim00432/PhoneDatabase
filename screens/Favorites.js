import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Favorites ({ navigation }) {
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('yoona-jc', value)
      console.log('saved string')
    } catch (e) {
      // saving error
      console.log('saving error')
    }
  }

  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('yoona-jc')
      console.log(value)
    } catch (e) {
      // read error
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <View>
        <StatusBar style='auto' />
        <Button
          onPress={() => storeData('dgwdthwrthwrt')}
          title='save string'
        />

        <Button
          onPress={() => {
            getData()
          }}
          title='get string'
        />

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
