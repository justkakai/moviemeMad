import axios from 'axios';
import xImage from '../assets/images/x-image-3.png';
import { HiOutlinePlus } from "react-icons/hi";
import { useEffect, useContext } from 'react';
import { ModalActiveContext } from '../contexts/ModalActiveContext';
import { MovieTitleContext } from '../contexts/MovieTitleContext';
import { ImdbIdContext } from '../contexts/ImdbIdContext';
import { ShowtimesContext } from '../contexts/ShowtimesContext';
import { MovieDetailsContext } from '../contexts/MovieDetailsContext';
import '../styles/MovieDetails.css';

function MovieDetails() {

    const { modalActive, setModalActive } = useContext(ModalActiveContext);
    const { movieTitle } = useContext(MovieTitleContext);
    const { imdbId, setImdbId } = useContext(ImdbIdContext);
    const { movieDetails } = useContext(MovieDetailsContext);
    const { showtimeResults, setShowtimeResults } = useContext(ShowtimesContext);

    useEffect(() => {
        axios.get(`/api/movieDetails/${movieTitle}`)
            .then(movie => {
                console.log("movieTitle - filmId", movie.data.films[0].film_id);
                console.log("movieTitle - imdbId", movie.data.films[0].imdb_title_id);
                console.log("this is the current film that's been clicked on", movie.data.films[0].film_name);
                console.log("mmmmm", movie.data);
                if (movie.data.films[0].imdb_title_id === imdbId) {
                    axios.get(`/api/movieShowtimes?filmId=${movie.data.films[0].film_id}&date=2022-06-18`)
                        .then(movie => {
                            setModalActive(true);
                            setShowtimeResults(movie.data.cinemas);
                            console.log(movie.data.cinemas);
                        })
                }
            })
            .catch(error => {
                // setModalActive(false);
                setShowtimeResults(null);
                console.log(error.message, "Oops! Looks like we don't have a movie title :(");
            })
        // eslint-disable-next-line
    }, [imdbId])

    return (
        <section
            className='movie-details-container' style={modalActive ? { transition: "height 1s" } : { height: "0", width: "0", padding: "0" }}>
            <button
                className='x-button'
                onClick={() => { setModalActive(false); setImdbId("") }}>
                <img src={xImage} alt="x within button to close modal" />
            </button>
            <h2>{movieTitle}</h2>
            <div className='movie-details'>
                <div className='movie-details-left'>
                    <img src={movieDetails.Poster} alt={`Poster for the movie ${movieDetails.Title}`} />
                </div>
                <div className='movie-details-right'>
                    <p>Release Year: {movieDetails.Year}</p>
                    <p>Runtime: {movieDetails.Runtime}</p>
                    <p>Genre: {movieDetails.Genre}</p>
                    <p>Rating: {movieDetails.Rated}</p>
                    <p>{movieDetails.Plot}</p>
                    <div className='trailer-and-watchlist'>
                        <a href="#/">Watch Trailer</a>
                        <button><HiOutlinePlus />Add to Watchlist</button>
                    </div>
                </div>
            </div>

            <h3>Screenings in Berlin</h3>
            {showtimeResults ?
                <ul className='cinemas-showing-film'>
                    {showtimeResults.map((cinema) => (
                        <li key={cinema.cinema_id} className="individual-cinema">
                            <h4>{cinema.cinema_name}</h4>
                            <ul className='screening-times'>
                                {cinema.showings.Standard.times.map((time, index) => (
                                    <li key={index}><button className='showtimes-button'>{time.start_time}</button></li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                :
                <p className='no-screenings'>Sorry, there are currently no screenings for this movie :(</p>
            }


        </section>
    )
}

export default MovieDetails;