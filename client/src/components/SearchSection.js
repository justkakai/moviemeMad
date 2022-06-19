import axios from 'axios';
import { useContext } from 'react';
import { ModalActiveContext } from '../contexts/ModalActiveContext';
import { SearchResultsContext } from '../contexts/SearchResultsContext';
import { SearchWordContext } from '../contexts/SearchWordContext';
import '../styles/SearchSection.css';

function SearchSection() {

    const { searchWord, setSearchWord } = useContext(SearchWordContext);
    const { setModalActive } = useContext(ModalActiveContext);
    const { setResults } = useContext(SearchResultsContext)

    const handleInput = () => {
        setModalActive(false);
        axios.get(`/api/getMovies/${searchWord}`)
            .then(movies => {
                console.log("searchword", movies.data)
                console.log("searching", movies.data.Search);
                setResults(movies.data.Search)
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
            <input className='search-box' type="text" spellCheck="false" onChange={(e) => setSearchWord(e.target.value.trim())} value={searchWord} onKeyDown={(e) => { handleKeyDown(e) }} />
            <button className='search-button' type="button" onClick={handleInput}>Search</button>
        </section>
    )
}

export default SearchSection;