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
import { useRoute } from '@react-navigation/native'
import { PhonesProvider, usePhonesDetails } from '../context/PhonesContext'
import * as Clipboard from 'expo-clipboard'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')
const height = width * 0.6

export default function Details ({ navigation }) {
  const route = useRoute()
  console.log(`Route params: ${route.params.phoneLink}`)
  const [
    phoneModel,
    setPhoneModel,
    phoneResults,
    setPhoneResults,
    phoneURL,
    setPhoneURL,
    phoneDetails,
    setPhoneDetails,
    favoritesList,
    addToFavorites,
    deleteFromFavorites,
    verifyPhoneInFavorites
  ] = usePhonesDetails()

  const [images, setImages] = useState([])
  const [active, setActive] = useState(0)
  const [specifications, setSpecifications] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [phoneLink, setPhoneLink] = useState()

  const copyToClipboard = (brand, phone_name) => {
    let stringToCopy = `${brand} ${phone_name}`
    Clipboard.setString(stringToCopy)
  }

  // console.log(`phone url: ${phoneURL}`)

  function getDetails (url) {
    setLoading(true)
    fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.json())
        return resp.json()
      })
      .then(data => {
        setPhoneDetails(data.data)
        console.log('Fetch details data')
        setSpecifications(data.data.specifications)
        setImages([
          data.data.phone_images[0],
          data.data.phone_images[1],
          data.data.phone_images[2],
          data.data.phone_images[3]
        ])
        setIsFavorited(verifyPhoneInFavorites(data.data.phone_name))
        setLoading(false)
      })
      .catch(err => {
        console.error(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    route.params.phoneLink && setPhoneLink(route.params.phoneLink)
    route.params.phoneLink && getDetails(route.params.phoneLink)
  }, [])
  useEffect(() => {}, [])

  useEffect(() => {
    setIsFavorited(verifyPhoneInFavorites(phoneDetails.phone_name))
  }, [favoritesList])

  if (specifications.length === 0 || isLoading) {
    return (
      <View style={[styles.activity_container, styles.activity_horizontal]}>
        <ActivityIndicator size='large' color='#7C7C7C' />
      </View>
    )
  }

  // console.log(specifications)
  // console.log(images)

  let change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    )
    if (slide !== active) {
      setActive(slide)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <ScrollView style={{ marginTop: 10 }}>
        <View style={styles.icons}>
          <Ionicons
            name='md-chevron-back-outline'
            size={30}
            color='#007AFF'
            style={{ marginLeft: 20, marginBottom: 10 }}
            onPress={() => navigation.navigate('HomeScreen')}
          />
          {!isFavorited && (
            <Ionicons
              style={{ marginRight: 40, marginBottom: 10 }}
              name='heart-outline'
              size={30}
              color='#007AFF'
              onPress={() => {
                addToFavorites({
                  brand: phoneDetails.brand,
                  phone_name: phoneDetails.phone_name,
                  detail: route.params.phoneLink
                })
                setIsFavorited(true)
              }}
            />
          )}
          {isFavorited && (
            <Ionicons
              style={{ marginRight: 40, marginBottom: 10 }}
              name='heart-sharp'
              size={30}
              color='#007AFF'
              onPress={() => {
                deleteFromFavorites(phoneDetails.phone_name)
                setIsFavorited(false)
              }}
            />
          )}
        </View>
        <ScrollView
          pagingEnabled
          horizontal
          onScroll={change}
          scrollEventThrottle={0}
          showsHorizontalScrollIndicator={false}
          style={{ width, height }}
        >
          {images.map((image, index) => (
            <Image key={index} style={styles.image} source={{ uri: image }} />
          ))}
        </ScrollView>
        <View style={styles.imageSlide}>
          {images.map((i, k) => (
            <Text
              key={k}
              style={k == active ? styles.pagingActiveText : styles.pagingText}
            >
              ⬤
            </Text>
          ))}
        </View>
        <View style={styles.detailsContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.name}>
              {phoneDetails.brand} {phoneDetails.phone_name}
            </Text>
            <TouchableOpacity
              onPress={copyToClipboard(
                phoneDetails.brand,
                phoneDetails.phone_name
              )}
            >
              <Ionicons
                style={{ marginLeft: 10 }}
                name='md-copy-outline'
                size={25}
                color='#007AFF'
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.fontStyle}>
            <Text style={styles.category}>
              {specifications[1].specs[0].key}
            </Text>
            <Text>&nbsp; {specifications[1].specs[0].val[0]}</Text>
          </Text>
          <Text style={styles.fontStyle}>
            <Text style={styles.category}>
              {specifications[1].specs[1].key}
            </Text>
            <Text>&nbsp; {specifications[1].specs[1].val[0]}</Text>
          </Text>
          {specifications[12] && (
            <Text style={styles.fontStyle}>
              <Text style={styles.category}>
                {specifications[12].specs[0].key}
              </Text>
              <Text>&nbsp; {specifications[12].specs[0].val[0]}</Text>
            </Text>
          )}
          <Text style={styles.fontStyle}>
            <Text style={styles.category}>Dimension</Text>
            <Text>&nbsp; {phoneDetails.dimension}</Text>
          </Text>
          <Text style={styles.fontStyle}>
            <Text style={styles.category}>
              {specifications[3].specs[1].key}
            </Text>
            <Text>&nbsp; {specifications[3].specs[1].val[0]}</Text>
          </Text>
          <Text style={styles.fontStyle}>
            <Text style={styles.category}>OS</Text>
            <Text>&nbsp; {phoneDetails.os}</Text>
          </Text>
          <Text style={styles.fontStyle}>
            <Text style={styles.category}>Storage</Text>
            <Text>&nbsp; {phoneDetails.storage}</Text>
          </Text>
          <Text style={styles.fontStyle}>
            <Text style={styles.category}>{specifications[10].title}</Text>
            <Text>&nbsp; {specifications[10].specs[0].val[0]}</Text>
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
  fontStyle: {
    fontSize: 15,
    lineHeight: 25
  },
  category: {
    fontWeight: '600'
  },
  name: {
    fontSize: 20,
    color: '#007AFF'
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'contain',
    overflow: 'hidden'
  },
  imageSlide: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  activity_container: {
    flex: 1,
    justifyContent: 'center'
  },
  activity_horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 17,
    borderRadius: 17,

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 9,
    elevation: 10
  },
  pagingText: {
    margin: 5,
    fontSize: 8,
    color: 'lightgrey'
  },
  pagingActiveText: {
    margin: 5,
    fontSize: 8
  }
})
