import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { usePhonesDetails } from '../context/PhonesContext'
import { useEffect, useState } from 'react/cjs/react.development'

export default function Favorites ({ navigation }) {
  const [
    phoneModel,
    setPhoneModel,
    phoneResults,
    setPhoneResults,
    phoneURL,
    setPhoneURL,
    phoneDetails,
    setPhoneDetails,
    getFavorites,
    addToFavorites,
    deleteFromFavorites
  ] = usePhonesDetails()

  const [data, setData] = useState()
  useEffect(() => {
    let fetchedData = getFavorites()
    setData(fetchedData)
  }, [])

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <View>
        <StatusBar style='auto' />
        <Text>Favorites</Text>
        <Button onPress={() => navigation.goBack()} title='Go back home' />
      </View>
      <View>
        <Text>Testing Storage:</Text>
        <Button
          title='save item'
          onPress={() => addToFavorites({ test: 'test' })}
        />
        {data && console.log(data)}
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
