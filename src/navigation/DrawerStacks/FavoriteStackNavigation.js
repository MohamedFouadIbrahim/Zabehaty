import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import {
    Favorites,
    SingleZabeha,
    SingleShop,
	PlacesSelectore
} from "../../screens";

import { strings } from "../../i18n";
import { myfonts } from '../../../assets';
import { Platform } from 'react-native';


const Stack = createStackNavigator()
const FavoriteStackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    title: strings("Favorites"),
                    headerShown: true,
                    headerStyle: {
                        height: Platform.OS == 'ios' ? 90 : 70 //115
                    },
                    headerTitleStyle: {
                        fontFamily: myfonts.TajwalRegular,
                    },
                }}
            />
			<Stack.Screen
				name="PlacesSelectore"
				component={PlacesSelectore}
			/>
            <Stack.Screen
                name="SingleZabeha"
                component={SingleZabeha}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="SingleShop"
                component={SingleShop}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}

export default FavoriteStackNavigation
