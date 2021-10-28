import {I18nManager, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flip: {
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
});
export default styles;
