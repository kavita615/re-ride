import {DarkTheme, DefaultTheme} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      white: string;
      black: string;
      success: string;
    }
    interface Theme {}
  }
}

export const DayTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    white: '#ffffff',
    black: '#000000',
    success: '#25a820',
  },
};

export const NightTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    white: '#ffffff',
    black: '#000000',
    success: '#25a820',
  },
};
