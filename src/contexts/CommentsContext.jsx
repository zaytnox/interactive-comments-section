import React, { createContext, useState } from 'react';
import { useComments } from '../hooks/useComments';

const CommentsContext = createContext({});

const CommentsContextProvider = ({ children }) => {
  const { state, methods } = useComments();
  return (
    <CommentsContext.Provider value={{ ...state, ...methods }}>
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentsContext, CommentsContextProvider };
