import React from 'react';
import { Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import { TajwalBold } from '../FontedText';
import { styles } from './styles';
export const CartButton = ({ onPress, text, isLoading = false, style, ...restProps }) => (

    <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress && onPress()}
        style={[styles.container, style]}
        {...restProps}
    >
        {isLoading ? <ActivityIndicator size='small' color={'white'} /> : <TajwalBold style={[styles.text, Platform.OS == 'ios' ? { lineHeight: 20 } : {}]} >
            {text}
        </TajwalBold>}

    </TouchableOpacity>
)
