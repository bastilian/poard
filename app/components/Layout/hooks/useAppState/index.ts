import { useState } from 'react';

const useAppState = () => {
  const [appState, setAppState] = useState({});

  const setNamespacesAppState = (namespace, value) => {
    setAppState((currentAppState) => {
      const resultValue = (typeof value === 'function') ? value(currentAppState[namespace]) : value;
      const newAppState = {
        ...currentAppState,
        [namespace]: resultValue
      };

      return newAppState
    })
  }

  return {
    current: appState,
    setAppState: setNamespacesAppState,
  };
}

export default useAppState;
