import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { strings } from "../../i18n";
import { icons } from "../../assets";
import { Row } from '../Row';
import { w } from '../../mutils';

export const AddressHeader = ({ country, governorate, city, containerStyle, onPress }) => (

    <View style={[styles.addressContainer, containerStyle]}>

        <TouchableOpacity onPress={() => onPress && onPress()} >
            <Text style={styles.changeAddressTxt}>{strings('ChangeAddress')}</Text>
        </TouchableOpacity>

		<View style={{ flexDirection: 'row' }}>
			<Row >
				<Text styles={styles.governorate}>{governorate}</Text>
				<Text> - </Text>
				<Text styles={styles.city}>{city}</Text>
			</Row>

			<Image source={icons.addressicon} style={{ marginStart: 5 }} />
		</View>
    </View>
)
