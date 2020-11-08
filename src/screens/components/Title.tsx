import React, { ReactNode } from 'react';
import { FlexStyle, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';

type PropTypes = {
  children: ReactNode;
  fontSize?: TextStyle['fontSize'];
  style?: StyleProp<FlexStyle | ViewStyle | TextStyle>;
};
export function Title({ children, fontSize, style }: PropTypes) {
  return <Text style={[style, { fontSize: fontSize ?? 20 }]}>{children}</Text>;
}
