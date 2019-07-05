import React from 'react';
import moment from 'moment';
import '../styles/DisplayWeather.css';

const DisplayWeather = ( { weather, location } ) => {
  const displayWeather = weather.map(weather => 
    <div className='weather' key={weather.id}>
      <img src={`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`}/>
      <div>{moment(weather.applicable_date, 'YYYY-MM-DD').format('MMMM Do')}</div>
      <div>{weather.weather_state_name}</div>
      <div>{((weather.max_temp * 9/5) + 32).toFixed(1) + '°F'}</div>
    </div>
  )
  return (
    <div>
      <div className='location'>{location}</div>
      <div className='weatherInfo'>
        {displayWeather}
      </div>
    </div>
  )
} 

export default DisplayWeather;