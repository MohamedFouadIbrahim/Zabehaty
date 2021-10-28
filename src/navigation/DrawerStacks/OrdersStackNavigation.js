import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import {
    MyOrders,
    TrackingOrder,
    TrackingOrderMap,
    ReportProblem,
    OnlinePaymentWebView,
    Invoice,
	SucessfulOrder
} from "../../screens";

import { strings } from "../../i18n";
import { myfonts } from '../../../assets';
import { CustomLeftHeader } from '../../components';

const Stack = createStackNavigator()
const OrdersStackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{
                    headerLeft: () => <CustomLeftHeader />,
                    headerTitle: strings("MyOrders"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="ReportProblem"
                component={ReportProblem}
                options={{
                    headerLeft: () => <CustomLeftHeader />,
                    headerTitle: strings("Report problem"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="TrackingOrder"
                component={TrackingOrder}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("TrackingOrder"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />


            <Stack.Screen
                name="TrackingOrderMap"
                component={TrackingOrderMap}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("OrderLocation"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="OnlinePaymentWebView"
                component={OnlinePaymentWebView}
                options={{
                    title: strings("Payment"),
                    headerShown: true,
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="Invoice"
                component={Invoice}
                options={{
                    title: strings("Invoice"),
                    headerShown: true,
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

			<Stack.Screen
				name="SucessfulOrder"
				component={SucessfulOrder}
				options={{
					headerShown: false,
					headerLeft: null,
				}}
			/>
        </Stack.Navigator>
    )
}

export default OrdersStackNavigation
