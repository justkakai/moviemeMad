import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors());

const config = {
    headers: {
        "client": "STUD_224",
        "x-api-key": "l2J1IJzLlZ8aW2sXZuNqEg0T2BzLRyO3ESdH8t1b",
        "authorization": "Basic U1RVRF8yMjRfWFg6emRpRUs1aTJHeTBB",
        "territory": "XX",
        "api-version": "v200",
        "geolocation": "-22.0;14.0",
        "device-datetime": "2022-06-16T18:06:27.435Z"
    }
};

app.get("/api/getMovies/:searchTerm", (req, res) => {
    axios.get(`https://www.omdbapi.com/?apikey=7d212626&s=${req.params.searchTerm}`)
        .then(movies => res.json(movies.data))
})

app.get("/api/getById/:id", (req, res) => {
    axios.get(`https://www.omdbapi.com/?apikey=7d212626&i=${req.params.id}&plot=full`)
        .then(movie => res.json(movie.data))
})

app.get("/api/movieDetails/:title", (req, res) => {
    axios.get(`https://api-gate2.movieglu.com/filmLiveSearch/?query=${req.params.title}`, config)
        .then(movie => res.json(movie.data))
})

app.get("/api/movieShowtimes?:filmId?:date", (req, res) => {
    axios.get(`https://api-gate2.movieglu.com/filmShowTimes/?film_id=${req.query.filmId}&date=${req.query.date}`, config)
        .then(movie => res.json(movie.data))
})

app.listen(PORT, (req, res) => {
    console.log(`Start...Server is running successfully on port ${PORT}`);
})
