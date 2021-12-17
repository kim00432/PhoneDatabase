import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  View,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { usePhonesDetails } from '../context/PhonesContext'
import * as Clipboard from 'expo-clipboard'
import { SliderBox } from "react-native-image-slider-box"

const {width} = Dimensions.get("window")
const height = width * 0.7

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

  const [images, setImages] = useState([])
  const [active, setActive] = useState(0)
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
        setImages([data.data.phone_images[0], data.data.phone_images[1], data.data.phone_images[2], data.data.phone_images[3]])

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
  console.log(images)

  let change = ({nativeEvent}) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
    if(slide !== active) {
      setActive(slide)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <ScrollView>
        <Button
          title='Go back'
          onPress={() => navigation.navigate('HomeScreen')}
        />
         <ScrollView 
            pagingEnabled 
            horizontal 
            onScroll={change}
            scrollEventThrottle={0}
            showsHorizontalScrollIndicator={false}
            style={{width, height}}>
            {
              images.map((image, index) => (
                <Image
                key={index}
                style={styles.image}
                source={{ uri: image }}
                />
              ))
            }
         </ScrollView>
         <View style={{flexDirection: 'row', position: 'absolute', bottom: 250, alignSelf: 'center' }}>
           {
             images.map((i, k) => (
              <Text key={k} style={k == active ? styles.pagingActiveText : styles.pagingText}>⬤</Text>
             ))
           }
         </View>
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
    width: width, 
    height: height, 
    resizeMode: 'contain',
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
  },
  pagingText: {
    margin: 3,
    fontSize: 10,
    color: 'lightgrey'
  },
  pagingActiveText: {
    margin: 3, 
    fontSize: 10,
  },
})
