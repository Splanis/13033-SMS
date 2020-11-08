import AsyncStorage from '@react-native-community/async-storage';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react';

export type ProfilePropTypes = {
  firstName: string;
  lastName: string;
  address: string;
};

type ProfileContextPropTypes = {
  profile: ProfilePropTypes;
  setProfile: Dispatch<SetStateAction<ProfilePropTypes>>;
};

export const ProfileContext = createContext<ProfileContextPropTypes>(
  {} as ProfileContextPropTypes
);

type ProfileProviderPropTypes = {
  children: ReactNode;
};
export function ProfileProvider({ children }: ProfileProviderPropTypes) {
  const [profile, setProfile] = useState<ProfilePropTypes>({
    firstName: '',
    lastName: '',
    address: ''
  });

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('profile', JSON.stringify(profile));
      } catch (error) {}
    })();
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
