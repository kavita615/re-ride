import {BehaviorSubject} from 'rxjs';
import {ReactiveState, useReactiveStateHandler} from 'reactive-state-handler';
import AsyncStorage from '@react-native-community/async-storage';

const LOADER_DELAY = 2000;

export type AppStateType = {
  loggedIn: boolean;
  user: any;
  token: string;
  loading: boolean;
};

interface AppStateHandlerInterface {
  initialState: AppStateType;
  subscriber$: BehaviorSubject<AppStateType>;

  setState(values: Partial<AppStateType>): void;
  getState(): AppStateType;
  resetState(): void;
  login({token, user}: {token: string; user: any}): void;
  logout(): void;
  checkLogin(): void;
}

class AppState extends ReactiveState {
  checkLogin = async () => {
    try {
      this.setState({loading: true});
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      if (token && userString) {
        this.setState({
          token,
          user: JSON.parse(userString),
          loggedIn: true,
          loading: false,
        });
      } else {
        setTimeout(() => {
          this.resetState();
        }, LOADER_DELAY);
      }
    } catch (error) {
      setTimeout(() => {
        this.resetState();
      }, LOADER_DELAY);
    }
  };

  login = async ({token, user}: {token: string; user: any}) => {
    console.log(token, user);
    await AsyncStorage.multiSet([
      ['user', JSON.stringify(user)],
      ['token', token],
    ]);
    this.setState({token, user, loggedIn: true, loading: false});
  };

  logout = async () => {
    await AsyncStorage.clear();
    this.resetState();
  };
}

const AppStateHandler: AppStateHandlerInterface = new AppState({
  loggedIn: false,
  user: null,
  token: '',
  loading: false,
});

export default AppStateHandler;

type addListener = () => void;

type removeListener = () => void;

export function useAppState(
  filterKeys?: Array<keyof AppStateType>,
): [Partial<AppStateType>, removeListener, addListener] {
  return useReactiveStateHandler(AppStateHandler, filterKeys);
}
