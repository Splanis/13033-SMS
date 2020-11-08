import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Column from '../layout/Column';
import { ProfileContext } from './../context/AppContext';
import { validateProfile } from './../validators/validateProfile';
import { Button } from './components/Button';
import { Title } from './components/Title';
import { ScreensParamList } from './ScreensParamList';

const errrorMessage = 'Πρέπει να βάλεις τουλάχιστον ένα χαρακτήρα';

type PropTypes = {
  navigation: StackNavigationProp<ScreensParamList, 'ProfileScreen'>;
};
export default function ProfileScreen({ navigation }: PropTypes) {
  const { profile, setProfile } = useContext(ProfileContext);

  const handleChangeText = (text: string, name: 'firstName' | 'lastName' | 'address') => {
    setProfile({ ...profile, [name]: text });
  };

  return (
    <Column justify="center">
      <Title>Στοιχεία Μηνύματος</Title>
      <View style={{ width: '100%', padding: 30, justifyContent: 'center' }}>
        <TextInput
          onChangeText={(text) => handleChangeText(text, 'firstName')}
          value={profile.firstName}
          style={styles.input}
          placeholder="Όνομα"
          selectionColor={'#376996'}
        />
        <Text style={styles.error}>{!profile.firstName && errrorMessage}</Text>
        <TextInput
          onChangeText={(text) => handleChangeText(text, 'lastName')}
          value={profile.lastName}
          style={styles.input}
          placeholder="Επώνυμο"
          selectionColor={'#376996'}
        />
        <Text style={styles.error}>{!profile.lastName && errrorMessage}</Text>
        <TextInput
          onChangeText={(text) => handleChangeText(text, 'address')}
          value={profile.address}
          style={styles.input}
          placeholder="Διεύθυνση"
          selectionColor={'#376996'}
        />
        <Text style={styles.error}>{!profile.address && errrorMessage}</Text>
        <View>
          {validateProfile(profile) && (
            <Button onPress={() => navigation.navigate('SmsScreen')}>Έτοιμος!</Button>
          )}
        </View>
      </View>
    </Column>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingVertical: 17,
    paddingHorizontal: 25,
    marginVertical: 0,
    fontSize: 16
  },
  title: {
    fontSize: 20
  },
  error: {
    color: 'tomato',
    height: 30,
    padding: 5
  }
});
