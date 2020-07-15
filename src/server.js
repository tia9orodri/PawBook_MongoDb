// import dependencies and initialize express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require ('./configs/mongodb').connectDB();


const app = express();

// enable parsing of http request body
app.use(bodyParser.json());
app.use(cors());

// routes and api calls
app.use('/animal',require('./routes/animal-route.js'));
app.use('/user', require('./routes/user-route.js'));


// start node server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`\x1b[32m(PLAIN) Server listening on port ${port}\x1b[0m.`);
});