import axios from 'axios';
import xImage from '../assets/x-image-3.png';
import { useEffect, useContext } from 'react';
import { ModalActiveContext } from '../contexts/ModalActiveContext';
import { MovieTitleContext } from '../contexts/MovieTitleContext';
import { ImdbIdContext } from '../contexts/ImdbIdContext';
import { ShowtimesContext } from '../contexts/ShowtimesContext';

function MovieDetails() {

    const { modalActive, setModalActive } = useContext(ModalActiveContext);
    const { movieTitle } = useContext(MovieTitleContext);
    const { imdbId, setImdbId } = useContext(ImdbIdContext);
    const { showtimeResults, setShowtimeResults } = useContext(ShowtimesContext);

    useEffect(() => {
        axios.get(`/api/movieDetails/${movieTitle}`)
            .then(movie => {
                console.log("movieTitle - filmId", movie.data.films[0].film_id);
                console.log("movieTitle - imdbId", movie.data.films[0].imdb_title_id);
                console.log("this is the current film that's been clicked on", movie.data.films[0].film_name);
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
                setModalActive(false);
                console.log(error.message, "Oops! Looks like we don't have a movie title :(");
            })
        // eslint-disable-next-line
    }, [imdbId])

    return (
        <section
            className='movie-details-container'
            style={modalActive ?
                { transition: "height 1s" } : { height: "0", width: "0", padding: "0" }}>
            <button
                className='x-button'
                onClick={() => { setModalActive(false); setImdbId("") }}>
                <img src={xImage} alt="x within button to close modal" />
            </button>
            <h2>Showtimes for <em>{movieTitle}</em></h2>

            <ul className='cinemas-showing-film'>
                {showtimeResults.map((cinema) => (
                    <li key={cinema.cinema_id} className="individual-cinema">
                        <h3>{cinema.cinema_name}</h3>
                        <ul className='screening-times'>
                            {cinema.showings.Standard.times.map((time, index) => (
                                <li key={index}><button className='showtimes-button'>{time.start_time}</button></li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

        </section>
    )
}

export default MovieDetails;