import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { usePhonesDetails } from '../context/PhonesContext'

export default function Details ({ navigation }) {
  const [phoneURL] = usePhonesDetails()
  console.log(phoneURL)

  const [data, setData] = useState([])

  function phoneDetails() {
    let url = phoneURL
    fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.json())
        return resp.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  useEffect(() => {
    setData(phoneDetails)
  })
  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <View>
        <StatusBar style='auto' />
        <Text>Details</Text>
        {/* <Button onPress={() => navigation.goBack()} title='Go back home' /> */}
        <Button
          title='Go back'
          onPress={() => navigation.navigate('HomeScreen')}
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
