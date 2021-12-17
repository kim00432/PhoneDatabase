import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { usePhonesDetails } from '../context/PhonesContext'
import * as Clipboard from 'expo-clipboard'

export default function Details ({ navigation }) {
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

  const [specifications, setSpecifications] = useState([])

  const copyToClipboard = (brand, phone_name) => {
    let stringToCopy = `${brand} ${phone_name}`
    Clipboard.setString(stringToCopy)
  }

  console.log(`phone url: ${phoneURL}`)

  function getDetails (url) {
    fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.json())
        return resp.json()
      })
      .then(data => {
        setPhoneDetails(data.data)
        console.log('Fetch details data')
        setSpecifications(data.data.specifications)
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  useEffect(() => {
    getDetails(phoneURL)
  }, [])

  if (specifications.length === 0) {
    return (
    <View style={[styles.activity_container, styles.activity_horizontal]}>
      <ActivityIndicator size="large" />
    </View>
    )
  }

  // console.log(specifications)

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <ScrollView>
        <Button
          title='Go back'
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <Image
          style={styles.image}
          source={{ uri: `${phoneDetails.phone_images[0]}` }}
        />
        <Image
          style={styles.image}
          source={{ uri: `${phoneDetails.phone_images[1]}` }}
        />
        <Image
          style={styles.image}
          source={{ uri: `${phoneDetails.phone_images[2]}` }}
        />
        <Image
          style={styles.image}
          source={{ uri: `${phoneDetails.phone_images[3]}` }}
        />
        <TouchableOpacity
          onPress={copyToClipboard(phoneDetails.brand, phoneDetails.phone_name)}
        >
          <Text style={{ fontFamily: 'Regular', fontSize: 15 }}>
            Copy phone name
          </Text>
        </TouchableOpacity>
        <Button
          title='Save Item'
          onPress={() =>
            addToFavorites({
              brand: phoneDetails.brand,
              phone_name: phoneDetails.phone_name,
              detail: phoneURL
            })
          }
        />
        <View style={styles.detailsContainer}>
          <Text>
            {phoneDetails.brand} {phoneDetails.phone_name}
          </Text>
          <Text>
            {specifications[1].specs[0].key} : {specifications[1].specs[0].val[0]}
          </Text>
          <Text>
            {specifications[1].specs[1].key} : {specifications[1].specs[1].val[0]}
          </Text>
          <Text>
            {specifications[12].specs[0].key} :{' '}
            {specifications[12].specs[0].val[0]}
          </Text>
          <Text>Dimension: {phoneDetails.dimension}</Text>
          <Text>
            {specifications[3].specs[1].key} : {specifications[3].specs[1].val[0]}
          </Text>
          <Text>OS: {phoneDetails.os}</Text>
          <Text>Storage: {phoneDetails.storage}</Text>
          <Text>
            {specifications[10].title} : {specifications[10].specs[0].val[0]}
          </Text>
        </View>
      </ScrollView>
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
    overflow: 'hidden'
  },
  activity_container: {
    flex: 1,
    justifyContent: "center"
  },
  activity_horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 17,

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.14,
    shadowRadius: 9,
    elevation: 10
  }
})
