// Importing the file library. 
const express = require('express');
var app = express();
var fs = require('fs')
var path = require('path')

var morgan = require('morgan');


// log all the logs into the txt file called access.log
// write system in append mode. 
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//setting up the logger
app.use(morgan('combined', { stream: accessLogStream }))

// All of the codes for root request and everything without code refactor.

app.get("/" , (req, res) => {
    res.send("<h2> Hello Welcome to the medium client api");
})

// Code to run a server on the port 3003
app.listen(3003, () => {
    console.log("Up and running");
})