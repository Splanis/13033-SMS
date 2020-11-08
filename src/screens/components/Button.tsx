import React, {ReactNode} from 'react'
import { StyleSheet, Text, TouchableOpacity , StyleProp, FlexStyle, ViewStyle} from 'react-native';

type PropTypes = {
    children: ReactNode,
    onPress: ( ) => void,
    style?: StyleProp<FlexStyle | ViewStyle>
}
export function Button({children, onPress, style}: PropTypes) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={[styles.buttonText, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#376996',
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
  
