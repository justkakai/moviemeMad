import { createContext, useState } from "react";

const ImdbIdContext = createContext(null);

function ImdbIdProvider({ children }) {

    const [imdbId, setImdbId] = useState("");

    return (
        <ImdbIdContext.Provider value={{ imdbId, setImdbId }}>
            {children}
        </ImdbIdContext.Provider>
    );
}

export { ImdbIdContext, ImdbIdProvider };