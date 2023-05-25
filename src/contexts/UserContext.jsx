import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.currentUser || '{}')
  );
  useEffect(() => {
    const getUser = async () => {
      const response = await import('../../data.json');
      const data = response.default;
      localStorage.currentUser = JSON.stringify(data.currentUser);
      setCurrentUser(data.currentUser);
    };
    if (!localStorage.currentUser) getUser();
  }, []);
  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
