import { createContext, useState } from "react";

const SearchWordContext = createContext(null);

function SearchWordProvider({ children }) {

    const [searchWord, setSearchWord] = useState("");

    return (
        <SearchWordContext.Provider value={{ searchWord, setSearchWord }}>
            {children}
        </SearchWordContext.Provider>
    );
}

export { SearchWordContext, SearchWordProvider };