// main back end file

/* how to start the server:
    run normally:
        node server.js
        npm run server
    run in dev mode (will update any changes made while running)
        npm run dev
*/

const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());
/*app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});*/

// for parsing the data in POST requests
app.use(express.json());
app.use(express.urlencoded());

// for creating different routes:
// create a file in the router folder for each endpoint api
// create an express router object in the file that handles each api call
// for the profile router, create 2 routes: GET for retreiving the users info when the page is loaded and POST for changing their profile info
// for the GET routes (profile and quote history), look up how to read parameters in the route link for the username, ex: "/profile?=username" or "/profile/username"
// then import the router and use it down below
// use for database calls in your router file: const mysql = require('mysql');
//      all database connection info is in the .env file

// routes:

// login route
const login = require('./routers/login'); // import the login route from the routers folder
app.use('/login',login); // set the login router to the login call

// signup route
const signup = require('./routers/signup');
app.use('/signup',signup);

// pricing route
const fuelrate = require('./routers/fuelrate');
app.use('/fuelrate',fuelrate);

// profile route
const profile = require('./routers/profile');
app.use('/profile',profile);

// quote history route
const quotehistory = require('./routers/quotehistory');
app.use('/quotehistory',quotehistory);

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

// starts the server on port 5000
app.listen(port, () => {
    console.log("Fuel Rate Website Server");
});

module.exports = app;