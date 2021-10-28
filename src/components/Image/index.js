import * as React from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
const _Image = ({
  children,
  source,
  flip,
  tintColor,
  imageStyle,
  resizeMethod,
}) => {
  return (
    <FastImage
      tintColor={tintColor}
      resizeMode={FastImage.resizeMode.cover}
      style={StyleSheet.compose(imageStyle, { tintColor })}
      source={source}
    >
      {children}
    </FastImage>
  );
};
export const CustomImage = React.memo(_Image);
