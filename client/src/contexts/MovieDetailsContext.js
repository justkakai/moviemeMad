import { createContext, useState } from "react";

const MovieDetailsContext = createContext(null);

function MovieDetailsProvider({ children }) {

    const [movieDetails, setMovieDetails] = useState({});

    return (
        <MovieDetailsContext.Provider value={{ movieDetails, setMovieDetails }}>
            {children}
        </MovieDetailsContext.Provider>
    );
}

export { MovieDetailsContext, MovieDetailsProvider };