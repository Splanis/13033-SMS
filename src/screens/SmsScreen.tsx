import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useContext, useState } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Column from '../layout/Column';
import { secondary } from '../theme/colors';
import { ProfileContext } from './../context/AppContext';
import { validateProfile } from './../validators/validateProfile';
import { Button } from './components/Button';
import { Title } from './components/Title';
import { ScreensParamList } from './ScreensParamList';
import { Reason, SmsNumber, smsReasons } from './smsReasons';

type Props = {
  navigation: StackNavigationProp<ScreensParamList, 'ProfileScreen'>;
};

export default function SmsScreen({ navigation }: Props) {
  const [smsNumber, setSmsNumber] = useState<SmsNumber | null>(null);
  const { profile, setProfile } = useContext(ProfileContext);

  const handlePress = () => {
    const SMSReceiver = '13033';
    const message = `${smsNumber} ${profile.firstName} ${profile.lastName} ${profile.address}`;
    Linking.openURL(`sms:${SMSReceiver}?body=${message}`);

    setProfile({
      ...profile,
      addresses: profile.addresses.includes(profile.address)
        ? profile.addresses
        : [profile.address, ...profile.addresses]
    });
  };

  return (
    <Column justify="space-evenly">
      <Title style={{ marginTop: 30 }}>Επιλέξτε τον λόγο μετακίνησης</Title>
      {smsReasons.map(({ number, label }: Reason) => (
        <TouchableOpacity
          key={number}
          style={[styles.smsNumber, smsNumber === number && styles.active]}
          onPress={() => setSmsNumber(number)}>
          <Text>{label}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.buttonArea}>
        {!validateProfile(profile) ? (
          <Button onPress={() => navigation.navigate('ProfileScreen')}>
            Συμπλήρωσε τα στοιχεία σου!
          </Button>
        ) : (
          smsNumber &&
          validateProfile(profile) && <Button onPress={handlePress}>Αποστολή SMS</Button>
        )}
      </View>
    </Column>
  );
}

const styles = StyleSheet.create({
  smsNumber: {
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    marginTop: 20
  },
  active: {
    backgroundColor: secondary,
    borderRadius: 50
  },
  buttonArea: {
    justifyContent: 'center',
    height: 40,
    width: '100%',
    paddingHorizontal: 20
  }
});
