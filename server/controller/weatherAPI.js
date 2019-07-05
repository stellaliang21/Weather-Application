const axios = require('axios');

const weatherAPI = (req, res) => {
  const location = req.params.location;
  axios.get(`https://www.metaweather.com/api/location/search/?query=${location}`)
  .then(response1 => { 
    axios.get(`https://www.metaweather.com/api/location/${response1.data[0].woeid}`)
    .then(response2 => res.send(response2.data))
    .catch(err => res.status(404).end());
  })
  .catch(err => res.status(404).end());
};

module.exports = { weatherAPI };