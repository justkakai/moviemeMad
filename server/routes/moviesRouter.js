const express = require('express');
const { getBySearchTerm, getById, getMovieDetails, getShowtimes } = require('../controllers/moviesControllers');

const router = express.Router();


/**
 * @method GET
 * @route /getMovies/:searchTerm
 * @desc getting all movies with specified term in their title
 * @access Public
 */

router.get("/getMovies/:searchTerm", getBySearchTerm);


/**
 * @method GET
 * @route /getById/:id
 * @desc getting movie with specified ID
 * @access Public
 */

router.get("/getById/:id", getById);


/**
 * @method GET
 * @route /movieDetails/:title
 * @desc getting details for a specific movie from the MovieGlu API
 * @access Public
 */

router.get("/movieDetails/:title", getMovieDetails);


/**
 * @method GET
 * @route /movieShowtimes?:filmId?:date
 * @desc getting all movie showtimes for movie specified by ID and date
 * @access Public
 */

router.get("/movieShowtimes?:filmId?:date", getShowtimes);



module.exports = router;