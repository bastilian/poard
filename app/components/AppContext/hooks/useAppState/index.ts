import { useEffect, useState } from 'react';

const useAppState = (preState = {}) => {
  const [appState, setAppState] = useState({});

  const setNamespacesAppState = (namespace: string, value: unknown) => {
    setAppState((currentAppState) => {
      const resultValue =
        typeof value === 'function' ? value(currentAppState[namespace]) : value;
      const newAppState = {
        ...currentAppState,
        [namespace]: resultValue,
      };

      return newAppState;
    });
  };

  useEffect(() => {
    for (const [namespace, state] of Object.entries(preState)) {
      setNamespacesAppState(namespace, state)
    }
  }, [preState])

  return {
    current: appState,
    setAppState: setNamespacesAppState,
  };
};

export default useAppState;
