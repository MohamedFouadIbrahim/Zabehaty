import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import {
    ChooseLanguage,
    Login,
    Registeration,
    RegisterationStep2,
    CountryAndCurrency,
    OnBoardScreen,
    Auth,
    ForgetPassword,
    VerificationCode,
    SocialRegisterationStep2,
    ResetPassword,
    PhoneNotFound
} from "../../screens";

import { strings } from "../../i18n";

import { CustomLeftHeader } from '../../components';
import { myfonts } from '../../../assets/fonts';

const Stack = createStackNavigator()

const AuthStackNavigation = () => {

    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Login"
                component={Auth}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="CountryAndCurrency"
                component={CountryAndCurrency}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="VerificationCode"
                component={VerificationCode}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Registeration"
                component={Registeration}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="RegisterationStep2"
                component={RegisterationStep2}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="SocialRegisterationStep2"
                component={SocialRegisterationStep2}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="PhoneNotFound"
                component={PhoneNotFound}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}

export default AuthStackNavigation
