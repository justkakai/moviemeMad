import { createContext, useState } from "react";

const ShowtimesContext = createContext(null);

function ShowtimesProvider({ children }) {

    const [showtimeResults, setShowtimeResults] = useState(null);

    return (
        <ShowtimesContext.Provider value={{ showtimeResults, setShowtimeResults }}>
            {children}
        </ShowtimesContext.Provider>
    );
}

export { ShowtimesContext, ShowtimesProvider };