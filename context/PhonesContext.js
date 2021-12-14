import React from 'react'
import { createContext, useContext } from 'react'
import { useState } from 'react'

const PhonesContext = createContext()

function PhonesProvider (props) {
  // search query
  const [phoneModel, setPhoneModel] = useState('iPhone 12')

  // data/search results received from search query
  const [phoneResults, setPhoneResults] = useState([])

  // selected phone from list of results -> url that fetches specific phone's details
  const [phoneURL, setPhoneURL] = useState(null)

  // received data from fetch of specific phone's details
  const [phoneDetails, setPhoneDetails] = useState([])

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
        setPhoneDetails
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
