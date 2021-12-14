import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  Alert
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
    setPhoneURL,
    phoneDetails,
    setPhoneDetails,
    isRefreshing,
    setIsRefreshing
  ] = usePhonesDetails()

  //
  //Initial search to find phone model
  function searchPhones () {
    setIsRefreshing(true)

    console.log(`Searched for:${phoneModel}`)
    let url = `http://api-mobilespecs.azharimm.site/v2/search?query=${phoneModel}`
    fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.json())
        return resp.json()
      })
      .then(data => {
        console.log(`data from search results:${data.data.phones}`)
        setIsRefreshing(false)
        setPhoneResults(data.data.phones)
      })
      .catch(err => {
        setIsRefreshing(false)
        Alert.alert(
          'Error',
          'You have either entered an invalid search query or the server did not respond, please try again.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          {
            cancelable: true,
            onDismiss: () => Alert.alert('Alert dismissed.')
          }
        )
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
      <View style={styles.container}>
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
          data={phoneResults}
          renderItem={phone => (
            <Phone
              device={phone}
              setPhoneURL={setPhoneURL}
              phoneURL={phoneURL}
              navigation={props.navigation}
            />
          )}
          keyExtractor={(item, index) => {
            return item.phone_name + '-' + index
          }}
          refreshing={isRefreshing}
          onRefresh={() => {
            searchPhones()
          }}
        />
      </View>
    </SafeAreaView>
  )
}

function Phone ({ device, navigation, phoneURL, setPhoneURL }) {
  // console.log(device.item.url)
  return (
    <Pressable
      // onPress={ev => {
      //   setPhoneURL(`${device.item.detail}`)
      //   console.log(`Clicked on phone: ${phoneURL}`)
      //   navigation.navigate('PhoneDetails')
      // }}
      onPress={ev => {
        setPhoneURL(`${device.item.detail}`)
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
