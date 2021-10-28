import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import {
	Notifactions,
} from "../../screens";

import { strings } from "../../i18n";
import { myfonts } from '../../../assets';


const Stack = createStackNavigator()
const NotificationStackNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Notifactions"
				component={Notifactions}
				options={{
					title: strings("Notifactions"),
					headerShown: true,
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
			/>
			

		</Stack.Navigator>
	)
}

export default NotificationStackNavigation
