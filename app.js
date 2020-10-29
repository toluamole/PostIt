const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Set up Routes
const userSignUpRoutes = require('./routes/userRoutes')

//Set up the express app
const app = express();

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//Setup a default catch-all route that sends back a welcome message
app.get('/', (req, res) => res.status(200).send({
    message: 'HelloWorld!',
}));
app.use(userSignUpRoutes);

module.exports = app;