import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import {
    ReferFriends
} from "../../screens";

import { strings } from "../../i18n";
import { myfonts } from '../../../assets';
import { Platform } from 'react-native';


const Stack = createStackNavigator()
const ReferStackNavigation = () => {
    return (
        <Stack.Navigator>
			<Stack.Screen
				name="ReferFriends"
				component={ReferFriends}
                options={{
                    title:null,
					headerShown: true,
					headerLeft: null,
                }}
			/>
        </Stack.Navigator>
    )
}

export default ReferStackNavigation
