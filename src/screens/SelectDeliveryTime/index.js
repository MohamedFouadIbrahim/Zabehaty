import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity, I18nManager } from 'react-native';
import Modal from 'react-native-modal';
import {Calendar, LocaleConfig} from 'react-native-calendars';


import { icons } from '../../assets';
import { Row } from '../../components';
import { strings } from '../../i18n';
import { checkoutSettings } from '../../services/Checkout';
import { myColors } from '../../styles';
import { checkIfDateOrDay } from '../DeliveryOptions/utils';
import { styles } from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons';

const SelectDeliveryTime = ({ navigation, route }) => {

	const {
		params: {
			selectedTime,
			selectedDateOrDay,
			cartItemId,
			settings: {
				date_from = "", // "2021-06-22",
				date_style = "", // "date",
				date_to = "", // "2021-07-15",
				delivery_times = [], // [{from, to}]
				available_days = [],
				payments = [],
				not_available_dates
			},
			selectedAddress
		}
	} = route

	const [disabledDates, setDisabledDates] = useState({})

	useEffect(() => {
		if (not_available_dates) {
			let listOfDisabledDates = {}
			not_available_dates.forEach( date => {
				listOfDisabledDates[date] = { disabled: true }
			})
			setDisabledDates(listOfDisabledDates)
		}
	}, [not_available_dates])

	useEffect(() => {
		if (I18nManager.isRTL) {
			LocaleConfig.locales['ar'] = {
				monthNames: ['يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر'],
				monthNamesShort: ['يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر'],
				dayNames: ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
				dayNamesShort: ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
				today: 'اليوم'
			};
			LocaleConfig.defaultLocale = "ar"
		}

		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.8}
					style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}
					onPress={() => {
						navigation.goBack()
					}}
				>
					<Ionicons
						name={(I18nManager.isRTL) ? 'arrow-forward-outline' : 'arrow-back-outline'}
						color={'#000000'}
						size={25}
					/>
				</TouchableOpacity>
			)
		})
	}, [])

	const [localSelectedTime, setLocalSelectedTime] = useState(selectedTime)
	const [localdelivery_times, setLocaldelivery_times] = useState(delivery_times)

	const [localSelectedDateOrDay, setLocalSelectedDateOrDay] = useState(selectedDateOrDay)
	const [localDateOrDayss, setLocalDateOrDayss] = useState(checkIfDateOrDay({ date_style, date_from, date_to, available_days }))


	const [showDaySelector, setShowDaySelector] = useState(false)
	const [showTimes, setShowTimes] = useState(true)

	useEffect(() => {
		if (date_style === 'range' || date_style === "date") {
			getSettings({ date: date_from })
		} else {
			getSettings({ day: available_days[0] })
		}
	}, [date_style, date_from, available_days])

	const onSelectDateOrDay = (dateOrDay) => {
		setLocalSelectedDateOrDay(dateOrDay)
		hideModal()
		if (date_style === 'range' || date_style === "date") {

			getSettings({ date: dateOrDay })
		} else {
			getSettings({ day: dateOrDay })
		}

	}

	const getSettings = ({ day, date }) => {
		setShowTimes(false)
		checkoutSettings({ cartId: cartItemId, date, day }, res => {

			const {
				date_from = "", // "2021-06-22",
				date_style = "", // "date",
				date_to = "", // "2021-07-15",
				delivery_times = [], // [{from, to}]
				available_days = [],
				payments = [] // [1,2]
			} = res.data

			console.log('resssssss', res.data)
			setLocaldelivery_times(delivery_times)
			setShowTimes(true)
			// let availableDatesOrDayes = checkIfDateOrDay({ date_style, date_from, date_to, available_days })
			// setLocaldelivery_times
			// setSelectedTime(`${delivery_times[0]?.from} to ${delivery_times[0]?.to}`)
			// setSelectedDateOrDay(availableDatesOrDayes[0])
			// setSettings(res.data)
			// setisLoading(false)
		})
	}

	const onFinishSelect = (dateOrDay, time) => {

		route.params.onFinishSelect(dateOrDay, time);
		navigation?.goBack()
	}

	const renderCloseHeader = () => (

		<View>

			<Row style={styles.closeHeaderContainer} >

				<Text style={styles.closeHeaderText}>
					{strings('Selectadeliveryslot')}
				</Text>

				<TouchableOpacity onPress={() => { navigation?.goBack() }}>
					<Image source={icons.closeGreen} resizeMode='contain' style={styles.closeHeaderImage} />
				</TouchableOpacity>
			</Row>

			<View style={styles.closeHeaderSeprator} />

		</View>

	)

	const showModal = () => {
		setShowDaySelector(true)
	}

	const hideModal = () => {
		setShowDaySelector(false)
	}

	const renderOneTime = (({ item, index }) => (

		<TouchableOpacity onPress={() => { onFinishSelect(localSelectedDateOrDay, item) }} >

			<Row style={styles.oneTimeContainer} >

				<Image source={icons.time} resizeMode='contain' />

				<Text style={styles.rangeText} >
					{`${item.from} - ${item.to}`}
				</Text>

			</Row>

			<View style={styles.oneTimeSeprator} />

		</TouchableOpacity>
	))

	const renderDaysModal = () => {
		return (
			<React.Fragment>
				{
					(showDaySelector &&
						<Modal
							isVisible={showDaySelector}
							onBackdropPress={() => { hideModal() }}
							onBackButtonPress={() => { hideModal() }}
						>
							<View style={styles.scollViewContainerView} >
								{
									(date_style === "days") ?
										<ScrollView
											contentContainerStyle={styles.scollViewContaiser}
										>
											{localDateOrDayss.map((item, index) => (
												<TouchableOpacity
													key={String(index)}
													onPress={() => { onSelectDateOrDay(item) }}
												>

													<Row style={styles.oneTimeContainer} >
														<Text style={styles.rangeText} >
															{item.title}
														</Text>
													</Row>

													<View style={styles.oneTimeSeprator} />
												</TouchableOpacity>
											))}
										</ScrollView>
										:
										<Calendar
											minDate={ date_from }
											maxDate={ date_to }
											markedDates={{
												[localSelectedDateOrDay.title]: {selected: true},
												...disabledDates
											}}
											onDayPress={(day) => {
												console.log('selected day', day)
												onSelectDateOrDay({ title: day.dateString, day: day.dateString})
											}}
											monthFormat={'yyyy MMM'}
											onMonthChange={(month) => {console.log('month changed', month)}}
											disableAllTouchEventsForDisabledDays={true}
											enableSwipeMonths={true}
										/>
								}
							</View>


							{/*
							<FlatList
								keyExtractor={(item, inde) => String(inde)}
								renderItem={({ item, index }) => {
									return (
										<TouchableOpacity
											onPress={() => { setShowDaySelector(false) }}
										>

											<Row style={styles.oneTimeContainer} >
												<Text style={styles.rangeText} >
													{item}
												</Text>

											</Row>

											<View style={styles.oneTimeSeprator} />

										</TouchableOpacity>
									)
								}}
								data={localDateOrDayss}
							/> */}
						</Modal>
					)
				}
			</React.Fragment>
		)

	}

	return (
		<SafeAreaView style={{ flex: 1 }} >
			<View style={styles.container} >
				{ /*renderCloseHeader()*/}
				<TouchableOpacity
					activeOpacity={1}
					style={styles.currentDayContainer}
					onPress={() => { showModal() }}
				>
					<Text style={styles.currentDayText} >
						{localSelectedDateOrDay.title}
					</Text>
				</TouchableOpacity>

				{renderDaysModal()}

				{ showTimes ?
					<FlatList
						data={localdelivery_times}
						keyExtractor={(item, index) => String(index)}
						renderItem={renderOneTime}
						contentContainerStyle={styles.timesContentContainerStyle}
					/>
					:
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<ActivityIndicator
							size='small'
							style={styles.activityIndicator}
							color={myColors.green3}
						/>
					</View>
				}
			</View>

		</SafeAreaView>
	)
}


export { SelectDeliveryTime };
