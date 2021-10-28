import Toast from 'react-native-simple-toast';
import { strings } from '../i18n';

export const showToast = (messge, trnslate = true) => {
    Toast.show(trnslate ? strings(messge) : messge, Toast.SHORT)
}