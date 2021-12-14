import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { usePhonesDetails } from '../context/PhonesContext'

export default function Details ({ navigation }) {
  const [
    phoneModel,
    setPhoneModel,
    phoneResults,
    setPhoneResults,
    phoneURL,
    setPhoneURL,
    phoneDetails, 
    setPhoneDetails
  ] = usePhonesDetails()

  console.log(`phone url: ${phoneURL}`)

  function getDetails (url) {
    fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.json())
        return resp.json()
      })
      .then(data => {
        setPhoneDetails(data.data)
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  useEffect(()=>{
    getDetails(phoneURL)
  }, [])

  // console.log(phoneDetail)

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <View>
        <StatusBar style='auto' />
        <View>
          <Image style={styles.image} source={{uri: `${phoneDetails.thumbnail}`}}/>
          <Text>{phoneDetails.brand} {phoneDetails.phone_name}</Text>
          <Text>{phoneDetails.release_date}</Text>
        </View>
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
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
    marginHorizontal: 5, 
    borderRadius: 20,
    overflow: "hidden",
  }
})
