import { createContext, useState } from "react";

const IsLoadingContext = createContext(null);

function IsLoadingProvider({ children }) {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </IsLoadingContext.Provider>
    );
}

export { IsLoadingContext, IsLoadingProvider };