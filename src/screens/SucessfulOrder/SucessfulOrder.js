import React, { useEffect } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux'

// CONSTAMTS
import { UPDATE_CART_NOTIFY_MESSAGE } from "../../Redux/actionTypes";


import { icons } from '../../assets';
import { strings } from '../../i18n';
import { styles } from './styles';

const SucessfulOrder = ({ navigation }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: UPDATE_CART_NOTIFY_MESSAGE, status: true })
	}, [])

    return (
        <SafeAreaView style={styles.conatiner} >


            <View style={styles.topContainer} >
                <Image
                    source={icons.like}
                    resizeMode='contain'
                />

                <Text style={styles.orderWasSuccessfullyCompletedText} >
                    {strings("OrderWasSuccessfullyCompleted")}
                </Text>

                <Text style={styles.youCanFollowOrderText} >
                    {strings("YouCanFollowOrder")}
                </Text>

            </View>

            <View>
                <TouchableOpacity
                    style={styles.followOrderButton}
                    onPress={() => {
                        navigation.popToTop()
                        navigation.jumpTo('MyOrders', { screen: 'MyOrders' })
                        // navigation.navigate('MyOrders')
                    }}
                >

                    <Text style={styles.followOrderText}>
                        {strings("FollowOrder")}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backToAppButton}
                    onPress={() => {
                        navigation.popToTop()
                        navigation.jumpTo('MyHome', { screen: 'Home' })
                    }}
                >

                    <Text style={styles.backToAppText} >
                        {strings("BackToApp")}
                    </Text>

                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export { SucessfulOrder };
