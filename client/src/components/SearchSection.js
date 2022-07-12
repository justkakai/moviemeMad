import axios from 'axios';
import { useContext } from 'react';
import { IsLoadingContext } from '../contexts/IsLoadingContext';
import { ModalActiveContext } from '../contexts/ModalActiveContext';
import { SearchResultsContext } from '../contexts/SearchResultsContext';
import { SearchWordContext } from '../contexts/SearchWordContext';
import '../styles/SearchSection.css';

function SearchSection() {

    const { searchWord, setSearchWord } = useContext(SearchWordContext);
    const { setModalActive } = useContext(ModalActiveContext);
    const { setResults } = useContext(SearchResultsContext);
    const { isLoading, setIsLoading } = useContext(IsLoadingContext);

    const handleInput = () => {
        setModalActive(false);
        setIsLoading(true);
        axios.get(`/api/getMovies/${searchWord.trim()}`)
            .then(movies => {
                console.log("searchword", movies.data)
                console.log("searching", movies.data.Search);
                setResults(movies.data.Search)
                setIsLoading(false);
            })
            .catch(error => console.log(error.message))
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleInput();
        } return;
    }

    return (
        <section className='search-section'>
            <div className='search-container'>
                <input className='search-box' type="text" placeholder='Search for any movie here!' spellCheck="false" onChange={(e) => setSearchWord(e.target.value)} value={searchWord} onKeyDown={(e) => { handleKeyDown(e) }} />
                <button className='search-button' type="button" onClick={handleInput}>Search</button>
            </div>
            <div className='loader' style={isLoading ? { display: "inherit" } : { display: "none" }}></div>
        </section>
    )
}

export default SearchSection;