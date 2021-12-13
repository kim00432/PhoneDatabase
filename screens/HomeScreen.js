import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { FlatList } from 'react-native-gesture-handler'

import { usePhonesDetails } from '../context/PhonesContext'

export default function HomeScreen (props) {
  const [phoneModel, setPhoneModel] = usePhonesDetails()

  //
  //Initial search to find phone model
  function searchPhones () {
    // props.setIsRefreshing(true)
    console.log(`Searched for:${props.phoneModel}`)
    let url = `http://api-mobilespecs.azharimm.site/v2/search?query=${props.phoneModel}`
    fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.json())
        return resp.json()
      })
      .then(data => {
        console.log(`data from search results:${data.data.phones}`)
        props.setIsRefreshing(false)
        props.setPhoneResults(data.data.phones)
      })
      .catch(err => {
        props.setIsRefreshing(false)
        alert(`Invalid search query, please try again.`)
      })
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      {/* Landing screen (top half) */}
      <View>
        <StatusBar style='auto' />

        <Text>Phone Database</Text>
        <Text>
          Search for any smartphone for its details and specifications
        </Text>
        <TextInput
          onChangeText={props.setPhoneModel}
          placeholder={`Try, "iPhone 12"`}
          placeholderTextColor='#616264'
          clearButtonMode='while-editing'
        />
        <Button title='Search phones' onPress={searchPhones} />
        <Button
          title='Go to details'
          onPress={() => props.navigation.navigate('Details')}
        />
      </View>

      {/* Search results (bottom half) */}
      <FlatList />
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
