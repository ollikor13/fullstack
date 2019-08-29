import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './weather'


const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const rows = () => {
    if(namesToShow.length > 10 && showAll === false){
      return (<p>Too many results!</p>)
    }else if(namesToShow.length === 1){
      return ( 
        namesToShow.map(country =>
          <div key={country.name} >
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2> {country.languages.map(language => <p key={language.name}>•{language.name}</p>)}
            <img src={country.flag} height="150px" alt=""/>
            <h2>Weather in {country.capital}</h2>
            <Weather capitalname={country.capital} />
          </div>
        )
      )
    }else{
      return(
        namesToShow.map(country =>
            <p key={country.name}>
            {country.name} <button onClick={() => clickedCountry(country.name)}>show</button>
          </p>
           )
      )
    }

  }

  const clickedCountry = (countryname) => {
    setNewFilter(countryname)
    setShowAll(false)
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if(event.target.value === '' && showAll === false){
      setNewFilter('')
      setShowAll(true)
    }else{
      setShowAll(false)
    }
  }
  
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const namesToShow = showAll
  ? countries
  : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLocaleLowerCase()))
  
  return (
    <div>
        <p>find countries <input value={newFilter} onChange={handleFilterChange} /></p>
      {rows()}
    </div>
  )

}

export default App