
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Render = ({capitalname}) => {
    
    const [weather, setWeather] = useState({current: {temp_c: 0, wind_kph: 0, condition: {icon: 'Loading'}}, location: {}})

    useEffect(() => {
      axios
        .get('http://api.apixu.com/v1/current.json?key=f1509d47c8694e5eb09103800191308'.concat('&q=', capitalname))
        .then(response => {
          setWeather(response.data)
        })
    }, [capitalname])


    
    if(weather !== {}){
        return(
            <div>
                <img src={weather.current.condition.icon} alt="Weathericon"/>
            <div>
                <b>Temperature: </b> {weather.current.temp_c} celsius
            </div>
                 <b>Wind: </b> {weather.current.wind_kph} km/h
            </div>
        )
    }
}

const Weather = ({capitalname}) => {

    return(
        <div>
            <Render capitalname={capitalname}/>
        </div>
    )
  
  }

  
export default Weather