const axios = require('axios');
const config = require('config');

const headers = { headers: config.get('headers') };
const apiKey = config.get('OMDb.api-key');

const getBySearchTerm = (req, res) => {
    const { searchTerm } = req.params;
    axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
        .then(movies => res.json(movies.data))
}

const getById = (req, res) => {
    const { id } = req.params;
    axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        .then(movie => res.json(movie.data))
}

const getMovieDetails = (req, res) => {
    const { title } = req.params;
    axios.get(`https://api-gate2.movieglu.com/filmLiveSearch/?query=${title}`, headers)
        .then(movie => res.json(movie.data))
}

const getShowtimes = (req, res) => {
    const { filmId } = req.query;
    const { date } = req.query;
    axios.get(`https://api-gate2.movieglu.com/filmShowTimes/?film_id=${filmId}&date=${date}`, headers)
        .then(movie => res.json(movie.data))
}

module.exports = { getBySearchTerm, getById, getMovieDetails, getShowtimes };