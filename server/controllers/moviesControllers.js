const axios = require('axios');
const config = require('config');

const headers = { headers: config.get('headers') };

const getBySearchTerm = (req, res) => {
    axios.get(`https://www.omdbapi.com/?apikey=7d212626&s=${req.params.searchTerm}`)
        .then(movies => res.json(movies.data))
}

const getById = (req, res) => {
    axios.get(`https://www.omdbapi.com/?apikey=7d212626&i=${req.params.id}`)
        .then(movie => res.json(movie.data))
}

const getMovieDetails = (req, res) => {
    axios.get(`https://api-gate2.movieglu.com/filmLiveSearch/?query=${req.params.title}`, headers)
        .then(movie => res.json(movie.data))
}

const getShowtimes = (req, res) => {
    axios.get(`https://api-gate2.movieglu.com/filmShowTimes/?film_id=${req.query.filmId}&date=${req.query.date}`, headers)
        .then(movie => res.json(movie.data))
}

module.exports = { getBySearchTerm, getById, getMovieDetails, getShowtimes };