import { createContext, useState } from "react";

const MovieTitleContext = createContext(null);

function MovieTitleProvider({ children }) {

    const [movieTitle, setMovieTitle] = useState(null);

    return (
        <MovieTitleContext.Provider value={{ movieTitle, setMovieTitle }}>
            {children}
        </MovieTitleContext.Provider>
    );
}

export { MovieTitleContext, MovieTitleProvider };