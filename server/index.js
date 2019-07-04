const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const { weatherAPI } = require('./controller/weatherAPI.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/location/:location', weatherAPI);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));