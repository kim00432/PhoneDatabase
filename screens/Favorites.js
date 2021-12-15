import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList
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

  let data = getFavorites()
  useEffect(() => {}, [getFavorites])

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
            <View>
              <Text>{favorite.item.brand}</Text>
            </View>
          )}
          keyExtractor={(item, index) => {
            return item + '-' + index
          }}
        />
      )}
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
