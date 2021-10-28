import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

const TajwalBlack = ({ children, style, ...restProps }) => <Text style={[styles.TajwalBlack, style]} {...restProps} >{children}</Text>
const TajwalRegular = ({ children, style, ...restProps }) => <Text style={[styles.TajwalRegular, style]} {...restProps} >{children}</Text>
const TajwalBold = ({ children, style, ...restProps }) => <Text style={[styles.TajwalBold, style]} {...restProps} >{children}</Text>
const TajwalMedium = ({ children, style, ...restProps }) => <Text style={[styles.TajwalMedium, style]} {...restProps} >{children}</Text>
const SegoeUIItalic = ({ children, style, ...restProps }) => <Text style={[styles.SegoeUIItalic, style]} {...restProps} >{children}</Text>
const SegoeUIRegular = ({ children, style, ...restProps }) => <Text style={[styles.SegoeUIRegular, style]} {...restProps} >{children}</Text>
const SegoeUISemibold = ({ children, style, ...restProps }) => <Text style={[styles.SegoeUISemibold, style]} {...restProps} >{children}</Text>
const SegoeUIBold = ({ children, style, ...restProps }) => <Text style={[styles.SegoeUIBold, style]} {...restProps} >{children}</Text>
const NunitoSansRegular = ({ children, style, ...restProps }) => <Text style={[styles.NunitoSansRegular, style]} {...restProps} >{children}</Text>
const TajawalLight = ({ children, style, ...restProps }) => <Text style={[styles.TajawalLight, style]} {...restProps} >{children}</Text>
const PoppinsMedium = ({ children, style, ...restProps }) => <Text style={[styles.PoppinsMedium, style]} {...restProps} >{children}</Text>
const PoppinsRegular = ({ children, style, ...restProps }) => <Text style={[styles.PoppinsRegular, style]} {...restProps} >{children}</Text>
const MicrosoftSansSerif = ({ children, style, ...restProps }) => <Text style={[styles.MicrosoftSansSerif, style]} {...restProps} >{children}</Text>

export {
    TajwalBlack,
    TajwalRegular,
    TajwalBold,
    TajwalMedium,
    SegoeUIItalic,
    SegoeUIRegular,
    SegoeUISemibold,
    SegoeUIBold,
    NunitoSansRegular,
    TajawalLight,
    PoppinsRegular,
    PoppinsMedium,
    MicrosoftSansSerif
}