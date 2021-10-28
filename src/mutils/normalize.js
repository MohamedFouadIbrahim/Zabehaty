import { RFValue } from 'react-native-responsive-fontsize';
const DESIGN_SCREEN_HEIGHT = 812;
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const w = (pixles) => {
  return width * (pixles / 375);
};
const h = (pixles) => {
  return height * (pixles / 812);
};
const calcFont = (pixels) => {
  return RFValue(pixels, DESIGN_SCREEN_HEIGHT) + 2;
};
const calcHeaderBorderRadius = (scale, radius) => {
  return (width * scale) * (radius / 100)
}
const calculateHalfWidth = (margin) => {
  return (width / 2) - (margin * 2)
}
const fullWidth = () => {
  return width;
};
const fullHeight = () => {
  return height;
};
export { w, h, calcFont, calcHeaderBorderRadius, calculateHalfWidth, fullWidth, fullHeight }
