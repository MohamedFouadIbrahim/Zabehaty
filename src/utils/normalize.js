// import {
//   widthPercentageToDP as width,
//   heightPercentageToDP as height,
// } from 'react-native-responsive-screen';
// import {RFValue} from 'react-native-responsive-fontsize';
// const DESIGN_SCREEN_WIDTH = 375;
// const DESIGN_SCREEN_HEIGHT = 812;
// const w = (pixels) => {
//   const deviceRatio = (pixels * 100) / DESIGN_SCREEN_WIDTH;
//   return width(deviceRatio);
// };
// const h = (pixels) => {
//   const deviceRatio = (pixels * 100) / DESIGN_SCREEN_HEIGHT;
//   return height(deviceRatio);
// };
// const calcFont = (pixels) => {
//   return RFValue(pixels, DESIGN_SCREEN_HEIGHT) + 2;
// };
// export {w, calcFont, h};
// import {RFValue} from 'react-native-responsive-fontsize';
// const DESIGN_SCREEN_HEIGHT = 812;
// import { Dimensions } from 'react-native';
//  const {width, height} = Dimensions.get('window');
//  const w = (pixles) => {
//   return width*(pixles/375);
// };
// const h = (pixles) => {
//   return height*(pixles/812);
// };
// const calcFont = (pixels) => {
//   return RFValue(pixels, DESIGN_SCREEN_HEIGHT) + 2;
// };
// export {w, h,calcFont}