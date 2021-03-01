import Snackbar, {SnackBarOptions} from 'react-native-snackbar';
import {DayTheme} from 'src/Constants/Theme';

class SnackbarHandler {
  errorToast = (text: string, options?: SnackBarOptions) => {
    Snackbar.show({
      backgroundColor: DayTheme.colors.error,
      duration: 5000,
      ...options,
      text,
    });
  };

  successToast = (text: string, options?: SnackBarOptions) => {
    Snackbar.show({
      backgroundColor: DayTheme.colors.success,
      duration: 5000,
      ...options,
      text,
    });
  };

  normalToast = (text: string, options?: SnackBarOptions) => {
    Snackbar.show({
      backgroundColor: DayTheme.colors.black,
      duration: 5000,
      ...options,
      text,
    });
  };
}

export default new SnackbarHandler();
