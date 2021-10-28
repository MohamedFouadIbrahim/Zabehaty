import * as React from "react";
import { TextInput } from "react-native";
import { styles } from "./styles";
import { myColors } from "../../styles/myColors";
const { memo } = React;
export const InputField = memo(
  ({ style, placeholderTextColor, onFocus, ...props }) => (
    <TextInput
      {...props}
      style={[styles.container, style]}
      placeholderTextColor={placeholderTextColor || myColors.gray6}
      onFocus={onFocus}
    />
  )
);
