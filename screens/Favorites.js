import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  Pressable
} from 'react-native'
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

  //load favorites on load
  useEffect(() => {}, [getFavorites])

  let data = getFavorites()

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
          onPress={() =>
            addToFavorites({
              brand: 'apple',
              phone_name: 'iphone 33',
              detail:
                'http://api-mobilespecs.azharimm.site/v2/apple_iphone_13_pro_max-11089'
            })
          }
        />
      </View>
      {data && (
        <FlatList
          ListHeaderComponent={
            <View
              style={{ paddingVertical: 8, backgroundColor: 'grey' }}
            ></View>
          }
          ListFooterComponent={
            <View
              style={{ paddingVertical: 8, backgroundColor: 'grey' }}
            ></View>
          }
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
        />
      )}
    </SafeAreaView>
  )
}

function Favorite ({ brand, phone_name, phoneURL, setPhoneURL, navigation }) {
  return (
    <Pressable
      onPress={ev => {
        setPhoneURL(`${phoneURL}`)
        console.log(phoneURL)
        navigation.navigate('Details')
      }}
    >
      <View>
        <Text>{brand}</Text>
        <Text>{phone_name}</Text>
      </View>
    </Pressable>
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
