import { createContext, useState } from "react";

const ModalActiveContext = createContext(null);

function ModalActiveProvider({ children }) {

  const [modalActive, setModalActive] = useState(false);

    return (
        <ModalActiveContext.Provider value={{modalActive, setModalActive}}>
            {children}
        </ModalActiveContext.Provider>
    );
}

export { ModalActiveContext, ModalActiveProvider };