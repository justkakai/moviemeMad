import axios from 'axios';
import blackBg from "../assets/black-background.png";
import { useContext } from 'react';
import { SearchResultsContext } from '../contexts/SearchResultsContext';
import { ImdbIdContext } from '../contexts/ImdbIdContext';
import { MovieTitleContext } from '../contexts/MovieTitleContext';
import '../styles/SearchResults.css';

function SearchResults() {

    const { setImdbId } = useContext(ImdbIdContext);
    const {setMovieTitle} = useContext(MovieTitleContext);
    const { results } = useContext(SearchResultsContext)

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
        <ul className='search-results-ul'>
            {results.map((movie, index) => (
                <li key={index} className="search-results-movie" onClick={() => handleClick(movie.imdbID, movie.Title)}>
                    <div className='movie-container'>
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
    )
}

export default SearchResults;