import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import {
	TermsConditions,
} from "../../screens";

import { strings } from "../../i18n";
import { myfonts } from '../../../assets';


const Stack = createStackNavigator()
const TermsAndConditionStackNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="TermsConditions"
				component={TermsConditions}
				options={{
					title: strings("TermsConditions"),
					headerShown: true,
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
						lineHeight: 22
					},
				}}
			/>
		</Stack.Navigator>
	)
}

export default TermsAndConditionStackNavigation
