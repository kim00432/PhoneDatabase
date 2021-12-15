import React from 'react'
import { createContext, useContext } from 'react'
import { useState } from 'react'
import useAsyncStorage from '../hooks/useAsyncStorage'

const PhonesContext = createContext()

function PhonesProvider (props) {
  // * * state data * * //

  // search query
  const [phoneModel, setPhoneModel] = useState('iPhone 12')

  // data/search results received from search query
  const [phoneResults, setPhoneResults] = useState([])

  // selected phone from list of results -> url that fetches specific phone's details
  const [phoneURL, setPhoneURL] = useState(null)

  // received data from fetch of specific phone's details
  const [phoneDetails, setPhoneDetails] = useState([])

  // * * AsyncStorage * * //

  //useAsyncStorage custom hook functions
  const [favoritesList, setFavoritesList] = useAsyncStorage('yoona-jc')

  //get all favorites
  function getFavorites () {
    return favoritesList
  }

  //add to favorites
  function addToFavorites (obj) {
    console.log(`received properties, creating item '${obj}'`)

    if (favoritesList) {
      let updatedFavorites = favoritesList.map(a => ({ ...a }))
      updatedFavorites.push(obj)

      setFavoritesList(updatedFavorites)
      console.log(`Updated favoritesList, now pushing to storage.`)
    } else {
      setFavoritesList(new Array(obj))
      console.log(
        `Created first item for favoritesList, now pushing to storage.`
      )
    }
  }

  //delete from favorites
  function deleteFromFavorites () {}

  return (
    <PhonesContext.Provider
      value={[
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
