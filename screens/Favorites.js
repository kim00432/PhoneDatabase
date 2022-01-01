import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Alert
} from 'react-native'

import { usePhonesDetails } from '../context/PhonesContext'
import { useEffect, useState } from 'react/cjs/react.development'

import { Ionicons } from '@expo/vector-icons'

export default function Favorites ({ navigation }) {
  const [, , , , , , favoritesList, , deleteFromFavorites] = usePhonesDetails()

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      {!favoritesList && (
        <View style={{ display: 'flex', flex: 1 }}>
          <Header />
        </View>
      )}
      {favoritesList && (
        <FlatList
          //Title section
          ListHeaderComponent={<Header />}
          //Favorites list
          data={favoritesList}
          renderItem={favorite => (
            <Favorite
              brand={favorite.item.brand}
              phone_name={favorite.item.phone_name}
              phoneLink={favorite.item.detail}
              navigation={navigation}
              deleteFromFavorites={deleteFromFavorites}
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

function Header () {
  return (
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
        You can add favorites by clicking on the heart shaped icon inside the
        Details page. Long press to remove.
      </Text>
    </View>
  )
}

function Favorite ({
  brand,
  phone_name,
  phoneLink,
  navigation,
  deleteFromFavorites
}) {
  return (
    <Pressable
      style={{ ...styles.favoritesCard, marginHorizontal: 17 }}
      onPress={ev => {
        console.log(`phone url to load: ${phoneLink}`)
        navigation.navigate('Details', { phoneLink: phoneLink })
      }}
      onLongPress={() => {
        Alert.alert(
          'Delete item',
          `Are you sure you want to delete ${phone_name} from your favorites?`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel delete of favorite.'),
              style: 'cancel'
            },
            {
              text: 'Delete',
              onPress: () => {
                deleteFromFavorites(phone_name)
              }
            }
          ],
          { cancelable: true }
        )
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
