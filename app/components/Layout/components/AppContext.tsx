import React from 'react';
import AppContext from '~/utils/appContext';
import useAppState from '../hooks/useAppState';

const AppContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const state = useAppState();

  return (
    <AppContext.Provider value={{ state }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
