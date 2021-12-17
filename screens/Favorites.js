import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable
} from 'react-native'

import { usePhonesDetails } from '../context/PhonesContext'
import { useEffect, useState } from 'react/cjs/react.development'

import { Ionicons } from '@expo/vector-icons'

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

  //load favorites on load
  useEffect(() => {}, [getFavorites])

  let data = getFavorites()

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      {data && (
        <FlatList
          //Title section
          ListHeaderComponent={
            <View>
              <Text
                style={{
                  ...styles.header,
                  marginVertical: 17,
                  marginHorizontal: 17
                }}
              >
                Favorites
              </Text>
              <Text
                style={{
                  ...styles.body,
                  marginHorizontal: 17,
                  marginBottom: 34
                }}
              >
                You can add favorites by clicking on the heart shaped icon
                inside the Details page. Long press to remove.
              </Text>
            </View>
          }
          //Favorites list
          data={data}
          renderItem={favorite => (
            <Favorite
              brand={favorite.item.brand}
              phone_name={favorite.item.phone_name}
              phoneURL={favorite.item.detail}
              setPhoneURL={setPhoneURL}
              navigation={navigation}
            />
          )}
          keyExtractor={(item, index) => {
            return item + '-' + index
          }}
          ListFooterComponent={<View style={{ paddingVertical: 8 }}></View>}
        />
      )}
    </SafeAreaView>
  )
}

function Favorite ({ brand, phone_name, phoneURL, setPhoneURL, navigation }) {
  return (
    <Pressable
      style={{ ...styles.favoritesCard, marginHorizontal: 17 }}
      onPress={ev => {
        setPhoneURL(`${phoneURL}`)
        console.log(phoneURL)
        navigation.navigate('Details')
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={styles.body}>{brand}</Text>
        <Text style={{ ...styles.title, paddingLeft: 4 }}>{phone_name}</Text>
      </View>
      <Ionicons name='chevron-forward' size={24} color='#007AFF' />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 34,
    fontWeight: '600',
    color: '#000'
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000'
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
    color: '#000'
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF'
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoritesCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 17,
    marginVertical: 8,
    borderRadius: 17,

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.14,
    shadowRadius: 9,
    elevation: 9
  }
})
