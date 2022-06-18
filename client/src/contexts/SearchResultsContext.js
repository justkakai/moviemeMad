import { createContext, useState } from "react";

const SearchResultsContext = createContext(null);

function SearchResultsProvider({ children }) {

    const [results, setResults] = useState([]);

    return (
        <SearchResultsContext.Provider value={{ results, setResults }}>
            {children}
        </SearchResultsContext.Provider>
    );
}

export { SearchResultsContext, SearchResultsProvider };