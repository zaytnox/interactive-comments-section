import React, { createContext, useState } from 'react';

const ModalContext = createContext({});

const ModalContextProvider = ({ children }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  return (
    <ModalContext.Provider value={{ modalVisibility, setModalVisibility }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
