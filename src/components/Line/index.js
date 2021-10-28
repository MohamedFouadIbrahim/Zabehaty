import * as React from "react";
import { View } from "react-native";
import { styles } from "./styles";

export const Line = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};
