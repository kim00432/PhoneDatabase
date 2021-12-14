import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, Image, FlatList, ListViewBase } from 'react-native'
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

  const [specifications, setSpecifications] = useState([])


  console.log(`phone url: ${phoneURL}`)

  function getDetails (url) {
    fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.json())
        return resp.json()
      })
      .then(data => {
        setPhoneDetails(data.data)
        console.log("Fetch details data")
        setSpecifications(data.data.specifications)
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  useEffect(()=>{
    getDetails(phoneURL)
  }, [])



  if(specifications.length === 0)  {return <Text>No data here yet....</Text>}
  console.log(specifications)

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <View>
        <StatusBar style='auto' />
        <View>
          {/* <Image style={styles.image} source={{uri: `${phoneDetails.thumbnail}`}}/> */}
          <Image style={styles.image} source={{uri: `${phoneDetails.phone_images[0]}`}}/>
          <Image style={styles.image} source={{uri: `${phoneDetails.phone_images[1]}`}}/>
          <Image style={styles.image} source={{uri: `${phoneDetails.phone_images[2]}`}}/>
          <Image style={styles.image} source={{uri: `${phoneDetails.phone_images[3]}`}}/>
          <Text>{phoneDetails.brand} {phoneDetails.phone_name}</Text>
          <Text>{specifications[1].specs[0].key} : {specifications[1].specs[0].val[0]}</Text>
          <Text>{specifications[1].specs[1].key} : {specifications[1].specs[1].val[0]}</Text>
          <Text>{specifications[12].specs[0].key} : {specifications[12].specs[0].val[0]}</Text>
          <Text>Dimension: {phoneDetails.dimension}</Text>
          <Text>{specifications[3].specs[1].key} : {specifications[3].specs[1].val[0]}</Text>
          <Text>OS: {phoneDetails.os}</Text>
          <Text>Storage: {phoneDetails.storage}</Text>
          <Text>{specifications[10].title} : {specifications[10].specs[0].val[0]}</Text>
         
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
