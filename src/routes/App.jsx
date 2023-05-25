import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import '../styles/style.css';
import { UserContextProvider } from '../contexts/UserContext';
import { ModalContextProvider } from '../contexts/ModalContext';
import { CommentsContextProvider } from '../contexts/CommentsContext';

const App = () => {
  return (
    <ModalContextProvider>
      <UserContextProvider>
        <CommentsContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </CommentsContextProvider>
      </UserContextProvider>
    </ModalContextProvider>
  );
};

export { App };
