import React, { ReactNode } from 'react';
import { FlexStyle, StyleProp, TextStyle, View, ViewStyle } from 'react-native';

type PropTypes = {
  children: ReactNode;
  justify?: FlexStyle['justifyContent'];
  align?: FlexStyle['alignItems'];
  style?: StyleProp<FlexStyle | ViewStyle | TextStyle>
};
export default function Column({ children, justify, align, style }: PropTypes) {
  const styles = {
    flex: 1,
    alignItems: align ?? 'center',
    justifyContent: justify ?? 'center',
    fontFamily: 'serif'
  };

  return <View style={[styles, style]}>{children}</View>;
}
