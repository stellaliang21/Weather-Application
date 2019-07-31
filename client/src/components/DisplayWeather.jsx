import React from 'react';
import moment from 'moment';
import '../styles/DisplayWeather.css';

class DisplayWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleTemp: false
    };
    this.displayInfo = this.displayInfo.bind(this);
    this.toggleTemp = this.toggleTemp.bind(this);
  }

  displayInfo() {
    const { weather } = this.props;
    const { toggleTemp } = this.state;
    const displayWeather = weather.map(weather => 
      <div className='weather' key={weather.id}>
        <img src={`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`}/>
        <div>{moment(weather.applicable_date, 'YYYY-MM-DD').format('MMMM Do')}</div>
        <div>{weather.weather_state_name}</div>
        {toggleTemp === false ? <div>{Math.ceil(((weather.max_temp * 9/5) + 32)) + '°F'}</div> : <div>{Math.ceil(weather.max_temp) + '°C'}</div>}
      </div>
      )
      return displayWeather;
  }

  toggleTemp() {
    const { toggleTemp } = this.state;
    this.setState({
      toggleTemp: !toggleTemp
    });
  }

  render() {
    const { location, weather } = this.props;
    const { toggleTemp } = this.state;

    let info;
    if (weather.length > 1) {
      info = <button onClick={this.toggleTemp}>
               {toggleTemp === false ? 'Change to C' : 'Change to F'}
             </button>
    } else {
      info = undefined
    }

    return (
    <div>
      <div className='location'>{location}</div>
      <div className='weatherInfo'>
        {this.displayInfo()}
      </div>
      {info}
    </div>
    )
  }
}

export default DisplayWeather;