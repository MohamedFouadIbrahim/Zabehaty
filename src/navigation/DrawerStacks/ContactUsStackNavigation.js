import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import {
	ContactUs,
} from "../../screens";

import { strings } from "../../i18n";
import { myfonts } from '../../../assets';


const Stack = createStackNavigator()
const ContactUsStackNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ContactUs"
				component={ContactUs}
				options={{
                    title: strings("ContactUs"),
                    headerShown: true,
                    headerStyle: {
                        height: Platform.OS == 'ios' ? 115 : 70
                    },
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
			/>
			

		</Stack.Navigator>
	)
}

export default ContactUsStackNavigation
