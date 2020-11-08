import React, { ReactNode } from 'react';
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

type StyleProps = {
  button: FlexStyle | ViewStyle;
  buttonText: TextStyle;
};
const styles = StyleSheet.create<StyleProps>({
  button: {
    backgroundColor: '#376996',
    borderRadius: 50,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Arial'
  }
});
