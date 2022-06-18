import axios from 'axios';
import { useState, useEffect } from 'react';
import xImage from "./assets/x-image-3.png";
import blackBg from "./assets/black-background.png";
import './App.css';

function App() {

  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([]);
  const [imdbId, setImdbId] = useState("");
  const [movieTitle, setMovieTitle] = useState(null);
  const [showtimeResults, setShowtimeResults] = useState([]);
  const [modalActive, setModalActive] = useState(false);

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
        // setShowtimeResults([]);
        console.log(error.message, "Oops! Looks like we don't have a movie title :(");
      })
    // eslint-disable-next-line
  }, [imdbId])

  const handleInput = () => {
    setModalActive(false);
    axios.get(`/api/getMovies/${searchWord}`)
      .then(movies => {
        console.log("searchword", movies.data)
        setResults(movies.data.Search)
      })
      .catch(error => console.log(error.message))
  }

  const handleClick = (id, title) => {
    console.log("id", id);

    axios.get(`/api/getById/${id}`)
      .then((movie) => {
        setImdbId(id);
        setMovieTitle(title);
        console.log("getById", movie.data)
      })
      .catch(error => console.log(error.message))
  }

  const handleBrokenImg = (image) => {
    image.src = blackBg;
  }

  return (
    <div className="App">

      <h1>movieme<em>Mad!</em></h1>
      <div className='search-section'>
        <input className='search-box' type="text" onChange={(e) => setSearchWord(e.target.value)} value={searchWord} />
        <button className='search-button' type="button" onClick={handleInput}>Search</button>
      </div>

      <div
        className='showtimes-container'
        style={modalActive ?
          { transition: "height 1s"} : { height: "0", width: "0", padding: "0" }}>
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

      </div>

      <ul className='search-results-ul'>
        {results.map((movie, index) => (
          <li key={index} className="search-results-movie" onClick={() => handleClick(movie.imdbID, movie.Title)}>
            <div className='movie-container'>
              {/* <p className='result-type'>{movie.Type}</p> */}
              <div className='image-container'><img onError={(e) => handleBrokenImg(e.target)} alt={movie.Title} src={movie.Poster} /></div>
              <p className='movie-title'>{movie.Title}</p>
              <div className='movie-extra-info'>
                <p className='result-type'>{movie.Type}!</p>
                <p className='movie-release-year'>{movie.Year}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
