import React, { ReactNode } from 'react';
import { FlexStyle, StyleProp, TextStyle, View, ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  justify?: FlexStyle['justifyContent'];
  align?: FlexStyle['alignItems'];
  style?: StyleProp<FlexStyle | ViewStyle | TextStyle>;
};

export function Column({ children, justify, align, style }: Props) {
  const styles = {
    flex: 1,
    alignItems: align ?? 'center',
    justifyContent: justify ?? 'center'
  };

  return <View style={[styles, style]}>{children}</View>;
}
