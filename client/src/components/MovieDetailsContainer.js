import axios from 'axios';
import xImage from '../assets/images/x-image-4.png';
import blackBg from "../assets/images/black-background.png";
import { HiOutlinePlus } from "react-icons/hi";
import { useState, useEffect, useContext, useRef } from 'react';
import { ModalActiveContext } from '../contexts/ModalActiveContext';
import { MovieTitleContext } from '../contexts/MovieTitleContext';
import { ImdbIdContext } from '../contexts/ImdbIdContext';
import { ShowtimesContext } from '../contexts/ShowtimesContext';
import { MovieDetailsContext } from '../contexts/MovieDetailsContext';
import '../styles/MovieDetails.css';

function MovieDetails() {

    const scrollRef = useRef();

    const { modalActive, setModalActive } = useContext(ModalActiveContext);
    const { movieTitle } = useContext(MovieTitleContext);
    const { imdbId, setImdbId } = useContext(ImdbIdContext);
    const { movieDetails } = useContext(MovieDetailsContext);
    const { showtimeResults, setShowtimeResults } = useContext(ShowtimesContext);

    const [isLoadingScreenings, setIsLoadingScreenings] = useState(false);


    let dayOfMonth = Date().split(" ")[2];
    let monthOfYear = (new Date().getMonth()) + 1;

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
        setIsLoadingScreenings(true);
        axios.get(`/api/movieDetails/${movieTitle}`)
            .then(movie => {
                console.log("movieTitle - filmId", movie.data.films[0].film_id);
                console.log("movieTitle - imdbId", movie.data.films[0].imdb_title_id);
                console.log("this is the current film that's been clicked on", movie.data.films[0].film_name);
                console.log("mmmmm", movie.data);
                if (movie.data.films[0].imdb_title_id === imdbId) {
                    setModalActive(true);
                    axios.get(`/api/movieShowtimes?filmId=${movie.data.films[0].film_id}&date=2022-0${monthOfYear}-${dayOfMonth}`)
                        .then(movie => {
                            setIsLoadingScreenings(false);
                            setShowtimeResults(movie.data.cinemas);
                            console.log(movie.data.cinemas);
                        })
                        .catch(error => console.log(error.message))
                }
            })
            .catch(error => {
                setIsLoadingScreenings(false);
                setShowtimeResults(null);
                console.log(error.message, "Oops! Looks like we don't have a movie title :(");
            })
        // eslint-disable-next-line
    }, [imdbId])

    return (
        <section
            className='movie-details-container' style={modalActive ? { transition: "height 1s" } : { height: "0", padding: "0", opacity: "0" }} ref={scrollRef}>

            <button
                className='x-button'
                onClick={() => { setModalActive(false); setImdbId("") }}>
                <img src={xImage} alt="x within button to close modal" />
            </button>

            <h2>{`${movieTitle} (${movieDetails.Year})`}</h2>
            <div className='movie-details'>
                <div className='movie-details-left'>
                    <img src={movieDetails.Poster} alt={`Poster for the movie ${movieDetails.Title}`} onError={(e) => e.target.src = blackBg} />
                </div>
                <div className='movie-details-right'>
                    <p><span className='details-headings'>Runtime:</span> {movieDetails.Runtime}</p>
                    <p><span className='details-headings'>Director:</span> {movieDetails.Director}</p>
                    <p><span className='details-headings'>Starring:</span> {movieDetails.Actors}</p>
                    <p><span className='details-headings'>Genre:</span> {movieDetails.Genre}</p>
                    <p><span className='details-headings'>Rating:</span> {movieDetails.Rated}</p>
                    <p>{movieDetails.Plot}</p>
                    <div className='trailer-and-watchlist'>
                        <a href="#/">Watch Trailer</a>
                        <button><HiOutlinePlus />Add to Watchlist</button>
                    </div>
                </div>
            </div>

            <h3>Screenings in Berlin</h3>
            {showtimeResults ?
                isLoadingScreenings ?
                    <div className='loader-screenings'></div> :
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
                isLoadingScreenings ?
                    <div className='loader-screenings'></div> :
                    <p className='no-screenings'>Sorry, there are currently no screenings for {movieTitle} in Berlin</p>
            }
        </section>
    )
}

export default MovieDetails;