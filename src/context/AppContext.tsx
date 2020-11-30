import AsyncStorage from '@react-native-community/async-storage';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react';

export type Profile = {
  firstName: string;
  lastName: string;
  addresses: string[];
  address: string;
};

type ProfileContext = {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
};

export const ProfileContext = createContext<ProfileContext>({} as ProfileContext);

type ProfileProvider = {
  children: ReactNode;
};

export function ProfileProvider({ children }: ProfileProvider) {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    addresses: [],
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
