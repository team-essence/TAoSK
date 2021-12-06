import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type UseLocalStorageReturn<T> = {
  currentValue: T
  setCurrentValue: Dispatch<SetStateAction<T>>
}

const getLocalStorageItem = <T>(key: string, initialValue?: T) => {
  if (!initialValue) return
  const value = localStorage.getItem(key)

  return value ? JSON.parse(value) : initialValue
}

export const useLocalStorage = <T>(key: string, initialValue?: T): UseLocalStorageReturn<T> => {
  const [currentValue, setCurrentValue] = useState<T>(getLocalStorageItem(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(currentValue))
  }, [currentValue, key])

  return { currentValue, setCurrentValue }
}
