import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons, } from '../../assets';
import { Row } from '../../components/Row';
import { w, h } from '../../mutils';
import { styles } from './styles';
import { strings } from "../../i18n";
import { useNavigation } from '@react-navigation/core';

const CurrentAddress = ({ AddressName, Address, houseNumber, roadNumber, onPressChange, isDefault = false, hideChangeBtn = false ,city,area,mobile,building_number}) => {

    const navigation = useNavigation()
    return (
        <Row style={styles.currentAddressContainer} >

            <Image source={icons.location} resizeMode='contain' style={{ paddingHorizontal: w(20) }} />

            <View style={{ alignItems: 'flex-start' }}>
                <Row>
                    <Text style={styles.delivredToText} >
                        {`${strings("DelivredTo")}: ${AddressName}`}
                    </Text>

                    {isDefault &&
                        <Text style={styles.isDefaultText} >
                            {`(${strings('Defalut')})`}
                        </Text>
                    }

                </Row>

                <Text style={[styles.fullAdress, { marginTop: h(5) }]}>
                    {Address}
                </Text>
                <Text style={[styles.fullAdress, { marginTop: h(5) }]}>
                    {city} - {area}
                </Text>
                <Text style={styles.fullAdress} >
                    {`${strings("mobile")}: ${mobile?mobile:strings('notAvailable')}`}
                </Text>
                <Text style={styles.fullAdress} >
                    {`${strings("BuildingNumber")}: ${building_number?building_number:strings('notAvailable')}`}
                </Text>
                <Text style={styles.fullAdress} >
                    {`${strings("DepartmentNumber")}: ${houseNumber?houseNumber:strings('notAvailable')}`}
                </Text>

                {roadNumber && <Text style={styles.fullAdress?mobile:strings('notAvailable')} >
                    {`${strings("RoadNumber")}: ${roadNumber?roadNumber:strings('notAvailable')}`}
                </Text>}

            </View>

			{
				(!hideChangeBtn &&
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.ChangeAddessButton}
						onPress={() => { onPressChange && onPressChange() }}
					>

						<Text style={styles.ChangeAddessText} >
							{strings('Change')}
						</Text>

					</TouchableOpacity>
				)
			}

        </Row>
    )
}

export default CurrentAddress
