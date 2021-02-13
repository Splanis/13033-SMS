import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useState } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { Column } from '../layout/Column';
import { secondary } from '../theme/colors';
import { useProfile } from './../context/AppContext';
import { saveAddress } from './../context/reducers';
import { validateProfile } from './../validators/validateProfile';
import { Button } from './components/Button';
import { Title } from './components/Title';
import { ScreensParamList } from './ScreensParamList';
import { Reason, SmsNumber, smsReasons } from './smsReasons';

type Props = {
  navigation: StackNavigationProp<ScreensParamList, 'ProfileScreen'>;
};

export function SmsScreen({ navigation }: Props) {
  const [smsNumber, setSmsNumber] = useState<SmsNumber | null>(null);
  const { state, dispatch } = useProfile();
  const { firstName, lastName, address } = state;

  const handlePress = () => {
    const SMSReceiver = '13033';
    const message = `${smsNumber} ${firstName} ${lastName} ${address}`;
    Linking.openURL(`sms:${SMSReceiver}?body=${message}`);
    dispatch(saveAddress());
  };

  return (
    <Column justify="space-evenly">
      <Title style={styles.title}>Επιλέξτε τον λόγο μετακίνησης</Title>
      {smsReasons.map(({ number, label }: Reason) => (
        <TouchableOpacity
          key={number}
          style={[styles.smsNumber, smsNumber === number && styles.active]}
          onPress={() => setSmsNumber(number)}>
          <Text>{label}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.buttonArea}>
        {!validateProfile(state) ? (
          <Button onPress={() => navigation.navigate('ProfileScreen')}>
            Συμπλήρωσε τα στοιχεία σου!
          </Button>
        ) : (
          smsNumber &&
          validateProfile(state) && <Button onPress={handlePress}>Αποστολή SMS</Button>
        )}
      </View>
    </Column>
  );
}

type Styles = {
  smsNumber: ViewStyle;
  title: TextStyle;
  active: ViewStyle;
  buttonArea: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  smsNumber: {
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  title: {
    marginTop: 30
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
