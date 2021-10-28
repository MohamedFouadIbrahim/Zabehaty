import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import call from 'react-native-phone-call';


import { icons } from '../../assets';
import { TajwalMedium, TajwalRegular } from '../../components';
import { strings } from '../../i18n';
import { calcFont, h, w } from '../../mutils';

const DeliveredByShop = ({ shop }) => {

	const callShop = () => {
		if (shop.mobile) {
			call({
				number: shop?.mobile,
				prompt: false
			})
		}
	}

    return (
        <View style={{ alignItems: 'center' }} >

            <Image source={icons.Deliveredbyshop} resizeMode='contain' />

            <TajwalMedium style={{ color: '#212F40', textAlign: 'center', fontSize: calcFont(22), marginTop: h(10) }} >
                {strings("No order Tracking for this order")}
            </TajwalMedium>

            <TajwalRegular style={{ color: '#BCC0C5', textAlign: 'center', fontSize: calcFont(16), marginVertical: h(5), marginHorizontal: w(20) }} >
                {strings("For more details please check your order details or contact shop")}
            </TajwalRegular>

            <TouchableOpacity activeOpacity={ 0.8 } onPress={ callShop }>
                <TajwalRegular style={{ color: '#667EEA', fontSize: calcFont(18) }} >
                    {strings("Contact shop")}
                </TajwalRegular>
            </TouchableOpacity>

        </View>
    )
}
export default DeliveredByShop
