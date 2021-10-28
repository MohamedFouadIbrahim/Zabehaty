import React, { useEffect, useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { style } from "styled-system";
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { calcFont, h, w } from "../../mutils";
import { myColors } from "../../styles";
import { styles } from "./styles";
import APIKit, { setBranchId } from "../../utils/APIKit";
import Snackbar from 'react-native-snackbar';

type Props = {
    title: String,
    canCompress: True | False,
    single: True | False,
    data: Array,
    onChange: Function,
}

export const ReOrderRateCard = (props: Props) => {
    const { details, id, orderStatus = [], onChange = () => { }, total, department, payment_method, created_at,
        details: products = [],
        created_at: orderDate,
        status = [],
        total: Total,
        paymentMethod,
        date,
        payment_status = undefined

    } = props

    const [selectedItemsObj, setSelectedItemsObj] = useState([])

    // useEffect(() => {
    // 	onChange(selectedItemsObj)
    // }, [selectedItemsObj])

    const reOrder = async () => {
        const response = await APIKit.post("user/repeat-order/add", {
            order_id: id,
        });
        console.log(response)
        if (response.data.status === 200) {
            if (response.data.data) {
                // Balance Transfered Successfully
                // setShowSuccessModal(true)
                props.navigation.navigate('MyCart', { screen: 'Cart', params: { department: department } })
            }
        } else {
            Snackbar.show({
                text: response.data.msg,
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: strings('close'),
                    textColor: 'white',
                    onPress: () => { /* Do something. */ },
                },
            });
        }
    }

    return (
        <View style={styles.frame} >
            <TouchableOpacity style={styles.header} onPress={() => {
                props.navigation.navigate('TrackingOrder', {
                    ...props,
                    orderStatus,
                    status,
                    products,
                    orderDate,
                    Total,
                    paymentMethod,
                    id,
                    deliveryDate: date
                })
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={icons.logo} style={{ alignSelf: 'center', width: w(39), height: h(39), resizeMode: 'contain' }} />
                    <View style={{ marginHorizontal: w(12) }}>
                        <Text style={styles.title}>{details[0]?.product?.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: w(140) }} >
                            <Text style={styles.description}>
                                {details[0]?.attributes && details[0]?.attributes.map((item, index) => {
                                    return (
                                        index < 3 && <>
                                            {item?.values[0]}
                                            {index != details[0]?.attributes?.length - 1 && ' - '}

                                        </>
                                    )
                                })}
                            </Text>
                        </View>
                    </View>
                    {details[0]?.attributes?.length > 2 && <Text style={styles.more}>{'+ '}{details[0]?.attributes?.length - 2} {strings('ITEMS')}</Text>}
                </View>
                <Text style={styles.price}>{total}{' ' + strings('AED')}</Text>
            </TouchableOpacity>
            <View style={{ borderColor: myColors.green3, borderWidth: 0.6 }} />
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={reOrder}>
                <Image
                    source={icons.reload}
                    style={styles.refreshImage}
                />
                <Text style={styles.reOrderText}>{strings('Repeat Order')}</Text>
            </TouchableOpacity>
        </View>
    )
};
