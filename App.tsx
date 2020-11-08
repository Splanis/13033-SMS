import React from 'react';
import { ProfileProvider } from './src/context/AppContext';
import { Screens } from './src/screens/Screens';

export default function App() {
  return (
    <ProfileProvider>
      <Screens />
    </ProfileProvider>
  );
}
