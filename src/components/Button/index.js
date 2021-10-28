import * as React from 'react';
import {TouchableOpacity} from 'react-native';
const {memo} = React;

export const Button = memo(
  ({onPress, children, ...props}) => (
    <TouchableOpacity onPress={onPress} {...props}>
      {children}
    </TouchableOpacity>
  ),
);
