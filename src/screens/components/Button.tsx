import React, { ReactNode } from 'react';
import { primary } from '../../theme/colors';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  FlexStyle,
  ViewStyle,
  TextStyle
} from 'react-native';

type PropTypes = {
  children: ReactNode;
  onPress: () => void;
  style?: StyleProp<FlexStyle | ViewStyle>;
};
export function Button({ children, onPress, style }: PropTypes) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.buttonText, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

type Style = {
  button: FlexStyle | ViewStyle;
  buttonText: TextStyle;
};

const styles = StyleSheet.create<Style>({
  button: {
    backgroundColor: primary,
    borderRadius: 50,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  }
});
