const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//Set up the express app
const app = express();

// Log request to the console
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Setup a default catch-all route that sebds back a welcome message
app.get('*', (req, res) => res.status(200).send({
    message: 'HelloWorld!',
}));

module.exports = app;