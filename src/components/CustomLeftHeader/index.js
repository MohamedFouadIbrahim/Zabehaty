import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, I18nManager } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

export const CustomLeftHeader = ({ isClose = true, isDrawer = false }) => {

    const navigation = useNavigation()

    if (isDrawer) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.drawerContainer}
                onPress={() => {
                    navigation.toggleDrawer()
                }}
            >
                <Image source={icons.homedrawericon} />
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={() => {
                navigation.goBack()
            }}
        >
            <Ionicons
                name={isClose ? 'close-outline' : (I18nManager.isRTL ? 'arrow-forward-outline' : 'arrow-back-outline')}
                color={'#000000'}
                size={25}
            />
        </TouchableOpacity>
    )
}