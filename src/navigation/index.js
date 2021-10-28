import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Splash } from '../screens';
import RootRouter from './root';

import MainStackNavigation from './MainStackNavigation'

import { useDispatch } from "react-redux";
import { OPEN_NOTIFICATION_PAGE, NOTIFICATION_DATA } from "../Redux/actionTypes";

const ApplicationContainer = ({ pushNotification, pushNotificationData }) => {

	const dispatch =  useDispatch()

	/*const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 3000);
	}, [])*/

	useEffect(() => {
		if (pushNotification) {
			dispatch({ type: OPEN_NOTIFICATION_PAGE, status: true })
		}
		if (pushNotificationData) {
			dispatch({ type: NOTIFICATION_DATA, data: pushNotificationData })
		}
	}, [pushNotification, pushNotificationData])

	return <MainStackNavigation />

	if (isLoading) {
		return (
			<Splash />
		)
	} else {

		return (
			<NavigationContainer>
				<RootRouter />
			</NavigationContainer>
		)
	}

}

export default ApplicationContainer
