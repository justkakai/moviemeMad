import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors());

app.get("/api/getMovies/:searchTerm", (req, res) => {
    axios.get(`https://www.omdbapi.com/?apikey=7d212626&s=${req.params.searchTerm}`)
        .then(movies => res.json(movies.data))
})

app.get("/api/getById/:id", (req, res) => {
    axios.get(`https://www.omdbapi.com/?apikey=7d212626&i=${req.params.id}&plot=full`)
        .then(movie => res.json(movie.data))
})

app.listen(PORT, (req, res) => {
    console.log(`Start...Server is running successfully on port ${PORT}`);
})