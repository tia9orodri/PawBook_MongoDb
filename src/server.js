// import dependencies and initialize express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const animalRoutes = require ('./routes/animal-route');

const app = express();

// enable parsing of http request body
app.use(bodyParser.json());
app.use(cors());

// routes and api calls
app.use('animal',animalRoutes);

// start node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`\x1b[32m(PLAIN) Server listening on port ${port}\x1b[0m.`);
});