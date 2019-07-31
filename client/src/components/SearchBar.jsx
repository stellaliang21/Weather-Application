import React from 'react';
import axios from 'axios';
import DisplayWeather from './DisplayWeather.jsx';
import '../styles/UserInput.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      location: '',
      invalidLocation: false,
      loading: false,
      searchedLocation: '',
      numberOfDays: '',
      filter: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getTime = this.getTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  getTime(location) {
    axios.get(`/location/${location}`)
    .then(results => {
      const weather = results.data.consolidated_weather;
      const location = results.data.title;
      const filteredInfo = weather.filter((info, index) => {
        return index < Number(this.state.numberOfDays)
      }); 

      this.setState({weather, location, invalidLocation: '', loading: false, filter: filteredInfo});
    })
    .catch(err => {
      console.log(err);
      this.setState({invalidLocation: true, loading: false});
    });
  }
  
  handleSubmit(e, location) {
    e.preventDefault();
    this.getTime(location);
    this.setState({
      loading: true
    });
  }

  render() {
    const { searchedLocation, weather, location, invalidLocation, loading, filter } = this.state;

    let data;
    if (loading === true) {
      data = <img src='https://ui-ex.com/images/transparent-blue-loading-image-gif.gif'></img>
    } else if (invalidLocation === true) {
      data = <div>Please submit a valid location</div>
    } else {
      data = 
      <DisplayWeather 
        weather={filter} 
        location={location} 
      />
    }

    return(
      <div>
        <form className='test' onSubmit={e => this.handleSubmit(e, searchedLocation)}>
          <input 
            name='searchedLocation'
            className='input' 
            type='text' 
            value={searchedLocation} 
            onChange={this.handleChange} 
            placeholder={'Location'} 
          />
          <select name='numberOfDays' onChange={this.handleChange}>
            <option value='1'>1 day</option>
            <option value='3'>3 days</option>
            <option value='5'>5 days</option>
          </select>
          <div>
            <input 
              type='submit' 
              value='Submit' 
            />
          </div>
        </form>
        {data}
      </div>
    );
  }
}

export default SearchBar;