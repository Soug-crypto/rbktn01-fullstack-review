const express = require('express');
const db = require('../database/index.js')
const axios = require('axios');
const config = require('../config.js');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
mongoose.Promise = Promise;


let app = express();
mongoose.connect('mongodb://localhost/fetcher');
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  db.Repo.find().limit(25)
  .then((data) => {res.send(data)})
  .then((data) => {
    if(data.length === 0){throw "oh NOOO"}
    res.send(data)
  })
  .catch((data) => {
    axios.get(`https://api.github.com/users/${req.data.username}/repos`)
    .then(function(response) { return db.save(response.data)})
    .then((data) => {
      res.send(data);
      res.end();
    })
  })
})



app.get('/repos/', function (req, res) {
  res.end("")
})

let port = 1128;
app.listen(port, () => {console.log(`listening on port ${port}`);})
