const axios = require('axios');

const weatherAPI = (req, res) => {
  const location = req.params.location
  axios.get(`https://www.metaweather.com/api/location/search/?query=${location}`)
  .then(response1 => { 
    axios.get(`https://www.metaweather.com/api/location/${response1.data[0].woeid}`)
    .then(response2 => res.send(response2.data))
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
};

module.exports = { weatherAPI };