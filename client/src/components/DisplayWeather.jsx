import React from 'react';
import moment from 'moment';
import '../styles/DisplayWeather.css';

const DisplayWeather = ( { weather, location } ) => {
  const svgImage = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
  const date = weather.applicable_date;
  const weatherState = weather.weather_state_name;
  const temperature = ((weather.max_temp * 9/5) + 32).toFixed(1) + '°F';
  const displayWeather = weather.map((weather) => 
    <div className='weather' key={weather.id}>
      <img src={svgImage}/>
      <div>{moment(date, 'YYYY-MM-DD').format('MMMM Do')}</div>
      <div>{weatherState}</div>
      <div>{temperature}</div>
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

export default DisplayWeather