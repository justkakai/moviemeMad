import axios from 'axios';
import { useState } from 'react';
import xImage from "./assets/x-image-2.png";
import blackBg from "./assets/black-background.png";
import './App.css';

function App() {

  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([]);
  const [imdbId, setImdbId] = useState("");
  const [movieTitle, setMovieTitle] = useState(null);
  const [showtimeResults, setShowtimeResults] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  /*   useEffect(() => {
      axios.get(`/api/movieDetails/${movieTitle}`)
        .then(movie => {
          console.log("movieTitle - filmId", movie.data.films[0].film_id);
          console.log("movieTitle - imdbId", movie.data.films[0].imdb_title_id);
          if (movie.data.films[0].imdb_title_id === imdbId) {
            axios.get(`/api/movieShowtimes?filmId=${movie.data.films[0].film_id}&date=2022-06-17`)
              .then(movie => {
                setShowtimeResults(movie.data.cinemas);
                console.log(movie.data.cinemas);
              })
          }
        })
        .catch(error => console.log("Oops! Looks like we don't have a movie title :("))
      // eslint-disable-next-line
    }, [imdbId]) */

  const handleInput = () => {
    axios.get(`/api/getMovies/${searchWord}`)
      .then(movies => {
        console.log("searchword", movies.data)
        setResults(movies.data.Search)
      })
      .catch(error => console.log(error))
  }

  const handleClick = (id, title) => {
    console.log("id", id);
    setImdbId(id);
    setMovieTitle(title);
    // setModalActive(true); 

    axios.get(`/api/getById/${id}`)
      .then(movie => {
        console.log("getById", movie.data)
      })
      .catch(error => console.log(error))

    axios.get(`/api/movieDetails/${movieTitle}`)
      .then(movie => {
        // console.log("moviedata", movie.data);
        console.log("movieTitle - filmId", movie.data.films[0].film_id);
        console.log("movieTitle - imdbId", movie.data.films[0].imdb_title_id);
        console.log("this is the current film that's been clicked on", movie.data.films[0].film_name);
        if (movie.data.films[0].imdb_title_id === imdbId) {
          axios.get(`/api/movieShowtimes?filmId=${movie.data.films[0].film_id}&date=2022-06-18`)
            .then(movie => {
              setModalActive(true);
              setShowtimeResults(movie.data.cinemas);
              console.log(movie.data.cinemas);
              console.log(movie.data);
            })
        } else {
          setShowtimeResults([]);
          setModalActive(false);
        }
      })
      .catch(error => console.log("Oops! Looks like we don't have a movie title :("))
  }

  const handleBrokenImg = (image) => {
    image.src = blackBg;
  }

  return (
    <div className="App">
      <div className='search-section'>
        <input className='search-box' type="text" onChange={(e) => setSearchWord(e.target.value)} value={searchWord} />
        <button className='search-button' type="button" onClick={handleInput}>Search</button>
      </div>
      <div
        className='showtimes-container'
        style={modalActive ?
          { display: "flex" } : { display: "none" }}
      >
        <button
          className='x-button'
          onClick={() => setModalActive(false)}>
          <img src={xImage} alt="x within button to close modal" />
        </button>
        <h2>{movieTitle}</h2>
        <ul className='cinemas-showing-film'>
          {showtimeResults.map((cinema) => (
            <li key={cinema.cinema_id}>
              <h3>{cinema.cinema_name}</h3>
              <ul>
                {cinema.showings.Standard.times.map((time, index) => (
                  <li key={index}>{time.start_time}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <ul>
        {results.map((movie, index) => (
          <li key={index} className="search-results-movie" onClick={() => handleClick(movie.imdbID, movie.Title)}>
            <div className='movie-container'>
              <div className='image-container'><img onError={(e) => handleBrokenImg(e.target)} alt={movie.Title} src={movie.Poster} /></div>
              <p>{movie.Title}</p>
              <p>{movie.Year}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
