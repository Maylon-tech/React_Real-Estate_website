import React, { useState, useEffect, createContext } from 'react'

import { housesData } from '../data'

// create Context
export const HouseContext = createContext()


export const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState('Location (any)')
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState('Property type (any)')
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState('Price range (any)')

  const [loading, setLoading] = useState(false)
  // Return all Countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country
    })
    // Remove duplicates
    const uniqueCountries = ['Lcoation (any)', ...new Set(allCountries)]
  
    // set countries state
    setCountries(uniqueCountries)
  }, [])

  // Return all Properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type
    })
    // Remove duplicates
    const uniqueProperties = ['Location (any)', ...new Set(allProperties)]

    // set countries state
    setProperties(uniqueProperties)
  }, [])

  const handleClick = () => {
    console.log(country, property, price)

    // Set loading
    setLoading(true)

    // create a function that checks if the string includes '(any)'
    const isDefault = (str) => {
      return str.split(' ').includes('(any)')
    }
    console.log(isDefault(country))

    // get first value of price and parse it to number
    const minPrice = parseInt(price.split(' ')[0])
    console.log(minPrice)
    // get second value of price which is the maximum price and parse it to number
    const maxPrice = parseInt(price.split(' ')[2])
    console.log(maxPrice)

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price)

      // If all values are selected
      if(
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house
      }

      // If all values are Default
      if(isDefault(country) && isDefault(property) && isDefault(price)) {
        return house
      }

      // If country is not default
      if(!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country
      }
 
      // If property is not default
      if(!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property
      }

      // If price is not default
      if(!isDefault(price) && isDefault(property) && isDefault(country)) {
        if(housePrice >= minPrice && housePrice <= maxPrice) {
          return house
        }
      }

      // country and property is not Default
      if(!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property
      }

       // country and price is not Default
       if(!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if(housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country && country
        }
      }

      // property & price is not Default
      if(isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if(housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property
        }
      }

    })

    setTimeout(() => {
      return newHouses.length < 1 
        ? setHouses([])
        : setHouses(newHouses),
      
        setLoading(false)
    }, 1000)
  }

  return (
    <HouseContext.Provider value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
      }}
    >
      { children } 
    </HouseContext.Provider>
  )
}

export default HouseContext
