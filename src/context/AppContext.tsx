import AsyncStorage from '@react-native-community/async-storage';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from 'react';
import { Action, initialState, reducer, State } from './reducers';

export type Profile = {
  firstName: string;
  lastName: string;
  addresses: string[];
  address: string;
};

type ProfileContext = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const ProfileContext = createContext<ProfileContext>({} as ProfileContext);

type ProfileProvider = {
  children: ReactNode;
};

export function ProfileProvider({ children }: ProfileProvider) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('profile', JSON.stringify(state));
      } catch (error) {}
    })();
  }, [state]);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
