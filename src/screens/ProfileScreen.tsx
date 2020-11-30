import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useCallback, useContext } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Column from '../layout/Column';
import { error, primary, secondary } from '../theme/colors';
import { ProfileContext } from './../context/AppContext';
import { validateProfile } from './../validators/validateProfile';
import { Button } from './components/Button';
import { Title } from './components/Title';
import { ScreensParamList } from './ScreensParamList';

const errorMessage = 'Πρέπει να βάλεις τουλάχιστον ένα χαρακτήρα';

type Props = {
  navigation: StackNavigationProp<ScreensParamList, 'ProfileScreen'>;
};

export default function ProfileScreen({ navigation }: Props) {
  const { profile, setProfile } = useContext(ProfileContext);

  const handlePressButton = useCallback(() => {
    navigation.navigate('SmsScreen');
    setProfile({
      ...profile,
      addresses: profile.addresses.includes(profile.address)
        ? profile.addresses
        : [profile.address, ...profile.addresses]
    });
  }, [profile]);

  const handleLongPress = useCallback(
    (address) => {
      Alert.alert(
        'Διαγραφή Διέθυνσης',
        'Θέλετε να διαγράψετε σίγουρα την διεύθυνση;',
        [
          {
            text: 'Όχι',
            style: 'cancel'
          },
          {
            text: 'Ναι',
            onPress: () =>
              setProfile({
                ...profile,
                addresses: profile.addresses.filter((a) => a !== address)
              })
          }
        ],
        { cancelable: false }
      );
    },
    [profile]
  );

  return (
    <Column>
      <Title>Στοιχεία Μηνύματος</Title>
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => setProfile({ ...profile, firstName: text })}
          value={profile.firstName}
          style={styles.input}
          placeholder="Όνομα"
          selectionColor={primary}
        />
        <Text style={styles.error}>{!profile.firstName && errorMessage}</Text>
        <TextInput
          onChangeText={(text) => setProfile({ ...profile, lastName: text })}
          value={profile.lastName}
          style={styles.input}
          placeholder="Επώνυμο"
          selectionColor={primary}
        />
        <Text style={styles.error}>{!profile.lastName && errorMessage}</Text>
        <TextInput
          onChangeText={(text) => setProfile({ ...profile, address: text })}
          value={profile.address}
          style={styles.input}
          placeholder="Διεύθυνση"
          selectionColor={primary}
        />
        <Text style={[styles.error, { display: !profile.address ? 'flex' : 'none' }]}>
          {errorMessage}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: profile.address ? 5 : 0,
            marginBottom: profile.addresses.length > 0 ? 0 : 20
          }}>
          {profile.addresses &&
            profile.addresses.map((address, index) => (
              <AddressPill
                onSelect={() => setProfile({ ...profile, address })}
                onLongPress={() => {
                  handleLongPress(address);
                }}
                key={index}
                address={address}
              />
            ))}
        </ScrollView>
        <View>
          {validateProfile(profile) && (
            <Button onPress={handlePressButton}>Έτοιμος!</Button>
          )}
        </View>
      </View>
    </Column>
  );
}

type AddressPillProps = {
  address: string;
  onSelect: () => void;
  onLongPress: () => void;
};

function AddressPill({ address, onSelect, onLongPress }: AddressPillProps) {
  return (
    <TouchableOpacity onPress={onSelect} onLongPress={onLongPress}>
      <Text style={styles.pill}>{address}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingVertical: 17,
    paddingHorizontal: 25,
    marginVertical: 0,
    fontSize: 16
  },
  container: { width: '100%', padding: 30 },
  title: {
    fontSize: 20
  },
  error: {
    color: error,
    height: 30,
    paddingVertical: 5
  },
  pill: {
    borderRadius: 24,
    backgroundColor: secondary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    marginVertical: 15
  }
});
