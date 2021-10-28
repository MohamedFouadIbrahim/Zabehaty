import React from 'react';
import { View, TouchableOpacity, Image, I18nManager, Text } from 'react-native';
import { styles } from './style';
import { strings } from '../../i18n';
import { icons } from '../../assets';
export const LoginButton = ({ onPress, containerStyle }) => {
    return (
        <TouchableOpacity activeOpacity={0.4} style={[styles.imageContainer, containerStyle]} onPress={onPress}>
            <View style={styles.entering}>
                <Text style={styles.enteringText}>{strings("Login")}</Text>
                {
                    (I18nManager.isRTL) ?
                        <Image source={icons.pointerRTL} style={styles.pointer} />
                        :
                        <Image source={icons.pointer} style={styles.pointer} />
                }
            </View>
        </TouchableOpacity>
    )
}