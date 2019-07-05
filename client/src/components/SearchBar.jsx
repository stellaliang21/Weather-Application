import React from 'react';
import axios from 'axios';
import DisplayWeather from './DisplayWeather.jsx';
import '../styles/UserInput.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      weather: [],
      location: '',
      invalidLocation: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getTime = this.getTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  getTime(location) {
    axios.get(`/location/${location}`)
    .then(results => {
      const weather = results.data.consolidated_weather;
      const location = results.data.title;
      this.setState({weather, location, invalidLocation: ''});
    })
    .catch(err => {
      console.log(err);
      this.setState({invalidLocation: 'Please type in a valid location!'});
    });
  }
  
  handleSubmit(e, location) {
    e.preventDefault();
    this.getTime(location);
  }

  render() {
    const { value, weather, location, invalidLocation } = this.state;
    return(
      <div>
        <form className='test' onSubmit={e => this.handleSubmit(e, value)}>
          <input 
            className='input' 
            type='text' 
            value={value} 
            onChange={this.handleChange} 
            placeholder={'Location'} 
          />
          <div>
            <input 
              type='submit' 
              value='Submit' 
            />
          </div>
        </form>
        <div>{invalidLocation}</div>
        <DisplayWeather 
          weather={weather} 
          location={location} 
        />
      </div>
    );
  }
}

export default SearchBar; 