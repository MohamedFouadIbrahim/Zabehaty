import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// Screens
import {
    MyAccount,
    UpdateAccount,
    Address,
    Addresses,
    CountryCitySelectore,
    ChangePassword,
    Map,
    PlacesSelectore,
    MyBalance,
    UpdateBalance,
    ChargeBalance,
    TransferBalance,
    SendBalance,
    BalanceContacts,
    ConfirmTransferBalance,
    ReferFriends
} from "../../screens";
import { strings } from '../../i18n';

import { CustomLeftHeader } from '../../components';
import { myfonts } from '../../../assets/fonts';
const Stack = createStackNavigator()
const MyAccountStackNavigation = () => {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="MyAccount"
                component={MyAccount}
                options={{
                    headerLeft: () => <CustomLeftHeader />,
                    headerTitle: strings("MyAccount"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="UpdateAccount"
                component={UpdateAccount}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("Profile"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("ChangePassword"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="Addresses"
                component={Addresses}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("SelectAddress"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />


            <Stack.Screen
                name="Address"
                component={Address}
            />

            <Stack.Screen
                name="Map"
                component={Map}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("Choose Location"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />
            <Stack.Screen
                name="ReferFriends"
                component={ReferFriends}
                options={{
                    title: null,
                    headerShown: true,
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name="CountryCitySelectore"
                component={CountryCitySelectore}
            />

            <Stack.Screen
                name="PlacesSelectore"
                component={PlacesSelectore}
            />



            <Stack.Screen
                name="MyBalance"
                component={MyBalance}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("wallet"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="UpdateBalance"
                component={UpdateBalance}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("addbalance"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />


            <Stack.Screen
                name="ChargeBalance"
                component={ChargeBalance}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("mybalance"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="TransferBalance"
                component={TransferBalance}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("addContact"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="SendBalance"
                component={SendBalance}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("send"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="BalanceContacts"
                component={BalanceContacts}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("send"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />

            <Stack.Screen
                name="ConfirmTransferBalance"
                component={ConfirmTransferBalance}
                options={{
                    headerLeft: () => <CustomLeftHeader isClose={false} />,
                    headerTitle: strings("send"),
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />


        </Stack.Navigator>
    )
}

export default MyAccountStackNavigation
