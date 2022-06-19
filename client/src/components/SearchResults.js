import axios from 'axios';
import blackBg from "../assets/images/black-background.png";
import sadFace from "../assets/images/sad-heart.png";
import { useContext } from 'react';
import { SearchResultsContext } from '../contexts/SearchResultsContext';
import { ImdbIdContext } from '../contexts/ImdbIdContext';
import { MovieTitleContext } from '../contexts/MovieTitleContext';
import { MovieDetailsContext } from '../contexts/MovieDetailsContext';
import { ModalActiveContext } from '../contexts/ModalActiveContext';
import '../styles/SearchResults.css';

function SearchResults() {

    const { setImdbId } = useContext(ImdbIdContext);
    const { setMovieTitle } = useContext(MovieTitleContext);
    const { results } = useContext(SearchResultsContext);
    const { setMovieDetails } = useContext(MovieDetailsContext);
    const { setModalActive } = useContext(ModalActiveContext);

    const handleClick = (id, title) => {
        console.log("id", id);

        axios.get(`/api/getById/${id}`)
            .then((movie) => {
                setImdbId(id);
                setMovieTitle(title);
                setModalActive(true);
                setMovieDetails(movie.data)
                console.log("getById", movie.data)
            })
            .catch(error => console.log(error.message))
    }

    return (
        <ul className='search-results-ul'>
            {results ?
                results.map((movie, index) => (
                    <li key={index} className="search-results-movie" onClick={() => handleClick(movie.imdbID, movie.Title)}>
                        <div className='movie-container'>
                            <div className='image-container'><img onError={(e) => e.target.src = blackBg} alt={movie.Title} src={movie.Poster} /></div>
                            <p className='movie-title'>{movie.Title}</p>
                            <div className='movie-extra-info'>
                                <p className='result-type'>{movie.Type}!</p>
                                <p className='movie-release-year'>{movie.Year}</p>
                            </div>
                        </div>
                    </li>
                ))
                :
                <div className='no-matching-results'>
                    <p>We don't seem to have any matching results in our database</p>
                    <img onError={(e) => e.target.src = blackBg} alt="No movies found" src={sadFace} />
                </div>
            }
        </ul>
    )
}

export default SearchResults;