import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useCallback } from 'react';
import {
  Alert,
  FlexStyle,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { Column } from '../layout/Column';
import { error, primary, secondary } from '../theme/colors';
import { useProfile } from './../context/AppContext';
import {
  changeAddress,
  changeFirstName,
  changeLastName,
  loadAddress,
  removeAddress,
  saveAddress
} from './../context/reducers';
import { validateProfile } from './../validators/validateProfile';
import { Button } from './components/Button';
import { Title } from './components/Title';
import { ScreensParamList } from './ScreensParamList';

const errorMessage = 'Πρέπει να βάλεις τουλάχιστον ένα χαρακτήρα';

type Props = {
  navigation: StackNavigationProp<ScreensParamList, 'ProfileScreen'>;
};

export function ProfileScreen({ navigation }: Props) {
  const { state, dispatch } = useProfile();
  const { firstName, lastName, address, addresses } = state;

  const handlePressButton = useCallback(() => {
    navigation.navigate('SmsScreen');
    dispatch(saveAddress());
  }, [state]);

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
            onPress: () => dispatch(removeAddress(address))
          }
        ],
        { cancelable: false }
      );
    },
    [state]
  );

  return (
    <Column>
      <Title>Στοιχεία Μηνύματος</Title>
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => dispatch(changeFirstName(text))}
          value={firstName}
          style={styles.input}
          placeholder="Όνομα"
          selectionColor={primary}
        />
        <Text style={styles.error}>{!firstName && errorMessage}</Text>
        <TextInput
          onChangeText={(text) => dispatch(changeLastName(text))}
          value={lastName}
          style={styles.input}
          placeholder="Επώνυμο"
          selectionColor={primary}
        />
        <Text style={styles.error}>{!lastName && errorMessage}</Text>
        <TextInput
          onChangeText={(text) => dispatch(changeAddress(text))}
          value={address}
          style={styles.input}
          placeholder="Διεύθυνση"
          selectionColor={primary}
        />
        <Text style={[styles.error, { display: !address ? 'flex' : 'none' }]}>
          {errorMessage}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: address ? 5 : 0,
            marginBottom: addresses.length > 0 ? 0 : 20
          }}>
          {addresses.length > 0
            ? addresses.map((address, index) => (
                <AddressPill
                  onSelect={() => dispatch(loadAddress(address))}
                  onLongPress={() => {
                    handleLongPress(address);
                  }}
                  key={index}
                  address={address}
                />
              ))
            : null}
        </ScrollView>
        <View>
          {validateProfile(state) && (
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

type Styles = {
  input: TextStyle;
  container: FlexStyle;
  title: TextStyle;
  error: TextStyle;
  pill: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
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
    paddingVertical: 5,
    textAlign: 'center'
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
