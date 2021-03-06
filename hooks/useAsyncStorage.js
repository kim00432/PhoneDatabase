//custom hook for local storage
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useAsyncStorage (storeKey) {
  const [val, setVal] = useState(() => {
    //
    const storedValue = async () => {
      let storedValue = await AsyncStorage.getItem(storeKey)
      if (storedValue) {
        console.log(`Found stored data: ${storedValue}`)
        return JSON.parse(storedValue)
      } else {
        console.log(`No stored data found`)
      }
    }
  })

  useEffect(async () => {
    try {
      const jsonValue = JSON.stringify(val)
      if (jsonValue) {
        await AsyncStorage.setItem(storeKey, jsonValue)
      }
    } catch (e) {
      console.log('saving error')
    }
  }, [storeKey, val])

  return [val, setVal]
}
