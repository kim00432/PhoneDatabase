import React from 'react'
import { createContext, useContext } from 'react'
import { useState } from 'react'
import useAsyncStorage from '../hooks/useAsyncStorage'

const PhonesContext = createContext()

function PhonesProvider (props) {
  // * * state data * * //

  // search query
  const [phoneModel, setPhoneModel] = useState('iPhone 13')

  // data/search results received from search query
  const [phoneResults, setPhoneResults] = useState([])

  // received data from fetch of specific phone's details
  const [phoneDetails, setPhoneDetails] = useState([])

  // * * AsyncStorage custom hook * * //

  //useAsyncStorage custom hook functions
  const [favoritesList, setFavoritesList] = useAsyncStorage('yoona-jc')

  //add to favorites
  function addToFavorites (obj) {
    console.log(`Received properties, creating item '${obj}'`)

    if (favoritesList) {
      let updatedFavorites = favoritesList.map(a => ({ ...a }))
      updatedFavorites.push(obj)

      setFavoritesList(updatedFavorites)
      console.log(`Added new item to favoritesList.`)
    } else {
      setFavoritesList(new Array(obj))
      console.log(`Created first item for favoritesList.`)
    }
  }

  //delete from favorites
  function deleteFromFavorites (phoneToDelete) {
    console.log(`deleting item ${phoneToDelete}`)
    let newList = favoritesList.filter(
      item => item.phone_name !== phoneToDelete
    )

    setFavoritesList(newList)
    console.log(`Deleted ${phoneToDelete}`)
  }

  //verify if phone is in favorites
  function verifyPhoneInFavorites (phone_name) {
    console.log(`Verify if ${phone_name} is in favorites list.`)

    let foundFavorites = false

    favoritesList &&
      favoritesList.forEach(item => {
        if (item.phone_name === phone_name) {
          foundFavorites = true
        }
      })
    return foundFavorites
  }

  return (
    <PhonesContext.Provider
      value={[
        phoneModel,
        setPhoneModel,
        phoneResults,
        setPhoneResults,
        phoneDetails,
        setPhoneDetails,
        favoritesList,
        addToFavorites,
        deleteFromFavorites,
        verifyPhoneInFavorites
      ]}
      {...props}
    />
  )
}

function usePhonesDetails () {
  const context = useContext(PhonesContext)
  if (!context) throw new Error(`Not inside the PhonesDetailsProvider`)
  return context //all state data and functions
}

export { usePhonesDetails, PhonesProvider }
