import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Column from '../layout/Column';
import { primary, secondary } from '../theme/colors';
import { ProfileContext } from './../context/AppContext';
import { validateProfile } from './../validators/validateProfile';
import ProfileScreen from './ProfileScreen';
import { ScreensParamList } from './ScreensParamList';
import SmsScreen from './SmsScreen';

const Tab = createBottomTabNavigator<ScreensParamList>();

export function Screens() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const profile = await AsyncStorage.getItem('profile');

        if (profile !== null) {
          setProfile(JSON.parse(profile));
          setLoading(false);
        }
      } catch (error) {
        Alert.alert('Προέκυψε κάποιο σφάλμα');
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <Column>
        <ActivityIndicator size="large" />
      </Column>
    );

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={validateProfile(profile) ? 'SmsScreen' : 'ProfileScreen'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            let iconName = '';

            if (route.name === 'SmsScreen') {
              iconName = 'ios-mail';
            } else if (route.name === 'ProfileScreen') {
              iconName = 'ios-person';
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={focused ? primary : secondary}
              />
            );
          },
          tabBarLabel: () => null
        })}>
        <Tab.Screen name="SmsScreen" options={{ title: 'SMS' }} component={SmsScreen} />
        <Tab.Screen
          name="ProfileScreen"
          options={{ title: 'Στοιχεία' }}
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
