import React from 'react';
import CacheProvider from 'src/Components/Shared/CacheProvider/CacheProvider';
import {ThemeProvider} from 'react-native-paper';
import AppRouter from './Navigation/AppRouter';
import {DayTheme} from './Constants/Theme';

function App() {
  return (
    <CacheProvider>
      <ThemeProvider theme={DayTheme}>
        <AppRouter />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
