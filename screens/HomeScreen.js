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
  Alert,
  Keyboard,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useState } from 'react'

import { usePhonesDetails } from '../context/PhonesContext'

import { Ionicons } from '@expo/vector-icons'

export default function HomeScreen (props) {
  //PhoneContext state data
  const [
    phoneModel,
    setPhoneModel,
    phoneResults,
    setPhoneResults
  ] = usePhonesDetails()

  //refreshing state
  const [isRefreshing, setIsRefreshing] = useState(false)

  //Search to find phone model
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
      <FlatList
        // Landing/title section
        ListHeaderComponent={
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View>
              <Text
                style={{
                  ...styles.header,
                  marginVertical: 17,
                  marginHorizontal: 17
                }}
              >
                Phone Database
              </Text>
              <Text
                style={{
                  ...styles.body,
                  marginHorizontal: 17
                }}
              >
                Search for any smartphone for its details and specifications
              </Text>
              <View style={styles.searchBar}>
                <Ionicons
                  name='md-search-outline'
                  size={17}
                  color='#616264'
                  style={{ marginHorizontal: 4 }}
                />
                <TextInput
                  onChangeText={setPhoneModel}
                  onSubmitEditing={() => {
                    searchPhones()
                    Keyboard.dismiss()
                  }}
                  placeholder={`Try, "iPhone 13"`}
                  placeholderTextColor='#616264'
                  clearButtonMode='while-editing'
                  returnKeyType='search'
                  style={{
                    fontSize: 15,
                    ...styles.input
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  searchPhones()
                  Keyboard.dismiss()
                }}
                style={styles.button}
              >
                <Text style={{ ...styles.buttonText }}>Search phones</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        }
        //Search results section
        data={phoneResults}
        renderItem={phone => (
          <Phone device={phone} navigation={props.navigation} />
        )}
        keyExtractor={(item, index) => {
          return item.phone_name + '-' + index
        }}
        refreshing={isRefreshing}
        onRefresh={() => {
          searchPhones()
        }}
        ListFooterComponent={<View style={{ paddingVertical: 8 }}></View>}
      />
    </SafeAreaView>
  )
}

//Phone component returned for each result that is returned from search
function Phone ({ device, navigation }) {
  return (
    <Pressable
      style={{ ...styles.searchResultsCard, marginHorizontal: 17 }}
      onPress={ev => {
        navigation.navigate('Details', { phoneLink: device.item.detail })
      }}
    >
      <View
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Image style={styles.image} source={{ uri: `${device.item.image}` }} />
        <View>
          <Text style={{ ...styles.body, paddingBottom: 4 }}>
            {device.item.brand}
          </Text>
          <Text style={styles.title}>{device.item.phone_name}</Text>
        </View>
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
  searchResultsCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 17,
    paddingHorizontal: 17,
    marginVertical: 8,
    borderRadius: 17,

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.14,
    shadowRadius: 9,
    elevation: 9
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEAED',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    marginHorizontal: 17,
    marginTop: 34
  },
  input: {
    flex: 1
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    marginHorizontal: 17,
    marginVertical: 34,
    paddingVertical: 12,
    borderRadius: 10
  },
  image: {
    width: 80,
    height: 105,
    marginVertical: 8,
    marginLeft: 8,
    marginRight: 17
  }
})
