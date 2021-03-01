import React from 'react';
import {
  QueryCache,
  ReactQueryCacheProvider,
  setConsole,
  setFocusHandler,
} from 'react-query';
import {AppState, AppStateStatus} from 'react-native';

const queryCache = new QueryCache();

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

setFocusHandler((handleFocus) => {
  const handleAppStateChange = (appState: AppStateStatus) => {
    if (appState === 'active') {
      handleFocus();
    }
  };
  AppState.addEventListener('change', handleAppStateChange);
  return () => AppState.removeEventListener('change', handleAppStateChange);
});

function CacheProvider({children}: any) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      {children}
    </ReactQueryCacheProvider>
  );
}

export default CacheProvider;
