// Setup Server// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    next();
  });
// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

const listen = app.listen(port,listening);

function listening(){
    console.log("#running server");
    console.log(`running on localhost: ${port}`);
}

// Callback function to complete GET '/all'
app.get('/all',getData);

function getData(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(projectData);
    console.log(projectData);

}

// Post Route
  const weatherData = [];
  app.post('/add',add);

  function add(req,res){
      newEntry={
          date:req.body.date,
          temperature:req.body.temp,
          content:req.body.content
      }
     
      weatherData.push(newEntry);
      res.send(weatherData);
      console.log(projectData);


  }