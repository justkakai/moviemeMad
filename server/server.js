const express = require('express');
const cors = require('cors');
const axios = require('axios');
const config = require('config');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors());

/* const config = {
    // sandbox headers 
    headers: {
        "client": "STUD_224",
        "x-api-key": "l2J1IJzLlZ8aW2sXZuNqEg0T2BzLRyO3ESdH8t1b",
        "authorization": "Basic U1RVRF8yMjRfWFg6emRpRUs1aTJHeTBB",
        "territory": "XX",
        "api-version": "v200",
        "geolocation": "-22.0;14.0",
        "device-datetime": "2022-06-21T18:06:27.435Z"
    }
    // evaluation credentials for germany (ONLY 75 REQUESTS!!!) 
    headers: {
        "client": "STUD_224",
        "x-api-key": "cWPdP4Lrai7OQtszNITBfaJU5JbRkKmP7dGmdnhF",
        "authorization": "Basic U1RVRF8yMjQ6MmM5WlZsWHdHdHVS",
        "territory": "DE",
        "api-version": "v200",
        "geolocation": "52.520008;13.404954",
        "device-datetime": "2022-06-21T18:06:27.435Z"
    } 

};*/

const headers = { headers: config.get('headers') };

app.get("/api/getMovies/:searchTerm", (req, res) => {
    axios.get(`https://www.omdbapi.com/?apikey=7d212626&s=${req.params.searchTerm}`)
        .then(movies => res.json(movies.data))
})

app.get("/api/getById/:id", (req, res) => {
    axios.get(`https://www.omdbapi.com/?apikey=7d212626&i=${req.params.id}`)
        .then(movie => res.json(movie.data))
})

app.get("/api/movieDetails/:title", (req, res) => {
    axios.get(`https://api-gate2.movieglu.com/filmLiveSearch/?query=${req.params.title}`, headers)
        .then(movie => res.json(movie.data))
})

app.get("/api/movieShowtimes?:filmId?:date", (req, res) => {
    axios.get(`https://api-gate2.movieglu.com/filmShowTimes/?film_id=${req.query.filmId}&date=${req.query.date}`, headers)
        .then(movie => res.json(movie.data))
})


const PORT = config.get('app.port') || 5007;

app.listen(PORT, () => {
    console.log(`Start...Server is running successfully on port ${PORT}`);
})
