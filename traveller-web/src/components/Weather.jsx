import React, { useEffect, useState } from 'react';
import './weather-styles.css';
import moment from 'moment';
import {
    Box,
    Button,
    IconButton
    
  } from '@chakra-ui/react'
  
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaLocationArrow } from 'react-icons/fa';




export default function Weather({weatherData, weatherData2, srcPlace, endPlace}) {

  
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       setLat(position.coords.latitude);
//       setLong(position.coords.longitude);
//     });
  
//     getWeather(lat, long)
//     .then(weather => {
//       setWeatherData(weather);
//       setError(null);
//     })
//     .catch(err => {
//       setError(err.message);
//     });

//     getForecast(lat, long)
//       .then(data => {
//         setForecast(data);
//         setError(null);
//       })
//       .catch(err => {
//         setError(err.message);
//       });

// }, [lat,long,error])


  
  const WeatherIcon = styled.div`
  color: whitesmoke;
`;
const WeatherIcon2 = styled.div`
  color: whitesmoke;
`;

  const refresh = () => {
    window.location.reload();
  }

  
  if(!weatherData.main){
    return (<div>Loading...</div>)
  }
  let weatherIcon = null;
  let weatherIcon2= null;

  
    if (weatherData.weather[0].main === 'Thunderstorm') {
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (weatherData.weather[0].main === 'Drizzle') {
      weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (weatherData.weather[0].main === 'Rain') {
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (weatherData.weather[0].main === 'Snow') {
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (weatherData.weather[0].main === 'Clear') {
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (weatherData.weather[0].main === 'Clouds') {
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
      weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }

    if (weatherData2.weather[0].main === 'Thunderstorm') {
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (weatherData2.weather[0].main === 'Drizzle') {
      weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (weatherData2.weather[0].main === 'Rain') {
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (weatherData2.weather[0].main === 'Snow') {
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (weatherData2.weather[0].main === 'Clear') {
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (weatherData2.weather[0].main === 'Clouds') {
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
      weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }

  

    return (<><div>
      
      Origin Weather Details
      <div className="main">
      <div className="top">
        {/* <p className="header">{weatherData.name}</p> */}
        <p className="header crop">{srcPlace}</p>
        
      </div>
      <div className="flex">
        <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        <div className="flex">
          <WeatherIcon style={{fontSize:30,marginTop:15}}>{weatherIcon}</WeatherIcon>
          <p className="description">{weatherData.weather[0].main}</p>
        </div>
      </div>

      <div className="flex">
        <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>
        <p className="temp">Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
      </div>
    
  </div>
      </div>
      
      <div>
      
      Destination Weather Details
      <div className="main">
      <div className="top">
        {/* <p className="header">{weatherData2.name}</p> */}
        <p className="header crop">{endPlace}</p>
        
      </div>
      <div className="flex">
        <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        <div className="flex">
          <WeatherIcon style={{fontSize:30,marginTop:15}}>{weatherIcon2}</WeatherIcon>
          <p className="description">{weatherData2.weather[0].main}</p>
        </div>
      </div>

      <div className="flex">
        <p className="temp">Temprature: {weatherData2.main.temp} &deg;C</p>
        <p className="temp">Humidity: {weatherData2.main.humidity} %</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">Sunrise: {new Date(weatherData2.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p className="sunrise-sunset">Sunset: {new Date(weatherData2.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
      </div>
    
  </div>
      </div>
      </>)
  
  
}