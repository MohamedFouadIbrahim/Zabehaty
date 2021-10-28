import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets';
import { Line, TajwalBold } from '../../components';
import { strings } from '../../i18n';
import { getOrders } from '../../services/Orders';
import { myColors } from '../../styles';
import Order from './Order';
import { styles } from './styles';

const MyOrders = (props) => {

    const isFocused = useIsFocused()
    const [orders, setOrders] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        if (isFocused) {
            _getOrders()
        }
    }, [isFocused])

    const _getOrders = () => {

        setIsRefreshing(true)
        getOrders(({ data }) => {
			console.log(data)
            setOrders(data)
            setIsRefreshing(false)
        }, err => {
            setIsRefreshing(false)
        })

    }

    const renderHeaderList = () => (
        <View>
            <TouchableOpacity
                onPress={() => {
                    if (!isRefreshing) {
                        _getOrders()
                    }
                }}
                style={styles.refreshRow}
            >

                <TajwalBold style={styles.refreshText} >
                    {strings("REFRESHORDERS")}
                </TajwalBold>

                <Image
                    source={icons.reload}
                    style={styles.refreshImage}
                />

            </TouchableOpacity>
            <Line style={styles.line} />
        </View>
    )


    return (
        <SafeAreaView style={styles.container} >

            <FlatList
                data={orders}
                extraData={orders}
                renderItem={({ item, index }) => (
                    <Order
                        {...item}
                        paymentMethod={item.payment_method == 1 ? strings("CashonDelivery") : strings("OnlinePayment")}
                        navigation={props.navigation}
                    />
                )}
                keyExtractor={(item, index) => String(item.id)}
                refreshControl={<RefreshControl refreshing={isRefreshing} colors={[myColors.green3]} onRefresh={() => _getOrders()} />}
                ListHeaderComponent={renderHeaderList}
            />

        </SafeAreaView>
    )

}

export { MyOrders };

