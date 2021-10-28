import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { icons } from '../../assets';
import { styles } from './styles';
import { Row } from '../../components';
import { useNavigation } from "@react-navigation/core";

export const CartBackHeader = ({ onBack, headerText, style, conatinerStyle, imageStyle }) => {

    const navigation = useNavigation()

    return (
        <Row style={[styles.container, conatinerStyle]} >

            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                    onBack && onBack()
                }}
            >
                <Image source={icons.currencyheaderIcon} resizeMode='contain' style={[styles.image, imageStyle]} />
            </TouchableOpacity>

            <Text style={[styles.deliverOptionsText, style]} >
                {headerText}
            </Text>

        </Row>
    )
}
