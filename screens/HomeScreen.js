import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  Pressable,
  Image
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { FlatList } from 'react-native-gesture-handler'

import { usePhonesDetails } from '../context/PhonesContext'

export default function HomeScreen (props) {
  const [
    phoneModel,
    setPhoneModel,
    phoneResults,
    setPhoneResults,
    phoneURL,
    setPhoneURL
  ] = usePhonesDetails()

  //
  //Initial search to find phone model
  function searchPhones () {
    // props.setIsRefreshing(true)
    console.log(`Searched for:${phoneModel}`)
    let url = `http://api-mobilespecs.azharimm.site/v2/search?query=${phoneModel}`
    fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.json())
        return resp.json()
      })
      .then(data => {
        console.log(`data from search results:${data.data.phones}`)
        // props.setIsRefreshing(false)
        setPhoneResults(data.data.phones)
      })
      .catch(err => {
        // props.setIsRefreshing(false)
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
          onChangeText={setPhoneModel}
          placeholder={`Try, "iPhone 12"`}
          placeholderTextColor='#616264'
          clearButtonMode='while-editing'
        />
        <Button title='Search phones' onPress={searchPhones} />
        {/* <Button
          title='Go to details'
          onPress={() => props.navigation.navigate('Details')}
        /> */}
      </View>

      {/* Search results (bottom half) */}
      <FlatList
        ListHeaderComponent={<View style={{ paddingVertical: 0 }}></View>}
        ListFooterComponent={<View style={{ paddingVertical: 8 }}></View>}
        data={phoneResults}
        renderItem={phone => (
          <Phone
            device={phone}
            setPhoneURL={setPhoneURL}
            phoneURL={phoneURL}
            navigation={props.navigation}
          />
        )}
        // refreshing={props.isRefreshing}
        // onRefresh={() => {
        //   props.setIsRefreshing(true)
        //   searchPhones()
        // }}
        keyExtractor={(item, index) => {
          return item.phone_name + '-' + index
        }}
      />
    </SafeAreaView>
  )
}

function Phone ({ device, navigation, phoneURL, setPhoneURL }) {
  return (
    <Pressable
      // onPress={ev => {
      //   setPhoneURL(`${device.item.detail}`)
      //   console.log(`Clicked on phone: ${phoneURL}`)
      //   navigation.navigate('PhoneDetails')
      // }}
      onPress={ev => {
        setPhoneURL(`${device.item.detail}`)
        // console.log(phoneURL)
        navigation.navigate('Details')
      }}
    >
      <View>
        <Image
          style={{
            width: 80,
            height: 105,
            margin: 8
          }}
          source={{ uri: `${device.item.image}` }}
        />
        <View>
          <Text>{device.item.brand}</Text>
          <Text>{device.item.phone_name}</Text>
        </View>
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
