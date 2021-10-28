import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, TouchableOpacity, View, I18nManager, Text } from 'react-native';
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { setClientToken } from "../utils/APIKit";
import ASYNC_STORAGE_KEYS from "../utils/AsyncStorageKeys";
import { UPDATE_USER } from "../Redux/actionTypes";

import { icons } from "../assets";
import { Line, Row, TajwalRegular } from '../components';
import { strings } from '../i18n';
import {
    CartStck,
    HomeStck,
    MyAccountStck,
    FavoriteStack,
    ContactUsStack,
    ReferStack
} from './Stacks';
import TermsAndConditionStackNavigation from './DrawerStacks/TermsAndConditionStackNavigation'
import ReferStackNavigation from './DrawerStacks/ReferStackNavigation'

import { styles } from './styles';
import { Alert } from 'react-native';

export const DrawerItems = [
    { id: 0, name: 'MyHome', icon: icons.MyHome, component: HomeStck },
    { id: 1, name: 'MyCart', icon: icons.Person, component: CartStck },
    { id: 2, name: 'MyAccount', icon: icons.Person, component: MyAccountStck },
    { id: 3, name: 'MyOrders', icon: icons.MyOrders, component: () => null },
    { id: 4, name: 'Favorites', icon: icons.Favorites, component: () => FavoriteStack },
    // { id: 5, name: 'AllProducts', icon: icons.AllProducts, component: () => null },
    // { id: 6, name: 'NotFountYouWant', icon: icons.Attention, component: () => null },
    { id: 7, name: 'ContactUs', icon: icons.Call, component: () => ContactUsStack },
    // { id: 7, name: 'Refer', icon: icons.referFriends, component: () => ReferStackNavigation },

	{ id: 8, name: 'TermsConditions', icon: icons.MyOrders, component: () => TermsAndConditionStackNavigation},
    // { id: 8, name: 'GainPoints', icon: icons.Star, component: () => null },
    // { id: 9, name: 'InfoAndLinks', icon: icons.Question, component: () => null },
    { id: 10, name: 'Logout', icon: icons.Exit, component: () => null },
]

const DrawerContent = (props) => {
    const dispatch = useDispatch();

    const {
        userData
    } = props

    // console.log('props', userData?.token)
    const logoutAction = async () => {
        dispatch({ type: UPDATE_USER, data: {} });

        setClientToken("");
        try {
            await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.FirebaseToken);
            await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.SelectedLanguage);
            await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.AuthBanners);
            await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.UserData);
        } catch (e) {
            // saving error
            console.log(e);
        }


        RNRestart.Restart();
    };

    const renderoneDrawerItem = (item, index) => (
		(item.name === "Logout" && !userData?.first_name) ?
			<View key={ String(item.id + index) }></View>
			:
			<View key={String(item.id + index)} >

				<TouchableOpacity
					onPress={() => {
						if (["MyHome", "MyCart", "MyAccount", "MyOrders", "Favorites", 'ContactUs','Refer' ,'TermsConditions'].includes(item.name)) {
							console.log("item:::>>", item, "item name ::>>", item.name)
							props.navigation.navigate(item.name)
						} else if (item.name === "Logout") {
							logoutAction()
						}
					}}
					style={styles.oneDrawerItemRow}
				>

					{item.name == "MyCart" ?
						<Ionicons
							name='ios-cart-outline'
							color={'#7D7D7D'}
							size={30}
							style={styles.oneDrawerItemIcon}
						/> :
						<Image source={item.icon} resizeMode='contain' style={styles.oneDrawerItemImage} />}

					<TajwalRegular style={styles.oneDrawerItemText} >
						{strings(item.name)}
					</TajwalRegular>
				</TouchableOpacity>

				<Line style={styles.Line} />
			</View>
    )

    return (
        <>
            <DrawerContentScrollView contentContainerStyle={styles.contentContainerStyle}>

                {userData?.first_name ? <Row style={styles.profileRow} >
                    <Image source={icons.Person} resizeMode='contain' style={styles.oneDrawerItemImage} />
                    <TajwalRegular style={styles.profileName} >
                        {`${userData?.first_name} ${userData?.last_name}`}
                    </TajwalRegular>
                </Row> :
                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={styles.imageContainer}
                        onPress={() => {
                            props.navigation.navigate('MyAuth', {
                                screen: 'Login',
                                params: {
                                    onFinishLogin: () => {
                                        props.navigation.goBack()
                                    },
                                    onFinishRegist: () => {
                                        props.navigation.goBack()
                                    },
                                    onFinishSkip: () => {
                                        props.navigation.goBack()
                                    }
                                }

                            })
                        }}>
                        <View style={styles.entering}>
                            <Text style={styles.enteringText}>{strings("Login")}</Text>
                            {
                                (I18nManager.isRTL) ?
                                    <Image source={icons.pointerRTL} style={styles.pointer} />
                                    :
                                    <Image source={icons.pointer} style={styles.pointer} />
                            }
                        </View>
                    </TouchableOpacity>
                }

                {DrawerItems.map(renderoneDrawerItem)}

            </DrawerContentScrollView>

            <View style={styles.logoContainer} >

                <Image source={icons.logo}
                    resizeMode="contain"
                    style={styles.logoImage}
                />
                <TajwalRegular style={styles.logoText} >
                    {strings("AllRightAreSaved")}
                </TajwalRegular>

            </View>
        </>
    )
}

export default DrawerContent
