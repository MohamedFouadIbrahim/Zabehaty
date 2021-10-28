import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	I18nManager,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Dimensions,
	BackHandler,
	ActivityIndicator
} from "react-native";
import Carousel from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useDispatch, useSelector } from "react-redux";

import { icons } from "../../assets";
import { myColors } from "../../styles";

import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";

// SVGs
import EmirateFlag from '../../assets/SVGs/EmirateFlag'

// Helpers
import { strings } from "../../i18n";
import { HomeHeader } from "../../components/HomeHeader";
import { useNavigation } from "@react-navigation/core";
import { ZabayhDepartment } from "../../components/ZabayhDepartment";
import { ZabayhOffer } from "../../components/ZabayhOffer";
import { ZabayhProducts } from "../../components/ZabayhProducts";
import { FlatList } from "react-native-gesture-handler";
import { AllProducts } from "../../components/AllProducts";
import { SubCategoryProducts } from "../../components/SubCategoryProducts";
import { Shop } from "../../components/Shop";
import { TajwalRegular, TajwalBold } from '../../components';
import SVGs from "../../assets/SVGs";
// Helpers
import APIKit, { setBranchId } from "../../utils/APIKit";
import { h, w } from "../../mutils";

const ReferFriends = ({ route, navigation }) => {
	const dispatch = useDispatch();
	const currentBranch = useSelector(state => state.address.currentBranch)

	const { navigate } = useNavigation();
	const [loading, setLoading] = useState(false)
	const [phone, setPhone] = useState('');
	const [newUser, setNewUser] = useState(false)
	const [checkUser, setCheckUser] = useState(false)
	const [listData, setListData] = useState([])
	const [shopsFiltered, setShopsFiltered] = useState([])
	const [productsFiltered, setProductsFiltered] = useState([])
	const fetchFriendList = async () => {
		const response = await APIKit.get("user/referral/list");
		console.log('friends list', response);
		if (response.data.status === 200) {
			setListData(response.data.data);

		}
	};
	useEffect(() => {
		fetchFriendList()
	}, []);
	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => {
			navigation.goBack()
			return true;
		});
	}, []);

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}
						onPress={() => {
							navigation.goBack()
						}}
					>
						<Ionicons
							name={(I18nManager.isRTL) ? 'arrow-forward-outline' : 'arrow-back-outline'}
							//name='close-outline'
							color={'#000000'}
							size={25}
						/>
					</TouchableOpacity>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<TajwalRegular style={{ fontSize: 20, lineHeight: 28, marginHorizontal: h(10) }}>{strings('Refer Friends')}</TajwalRegular>
					</View>
				</View>
			),

		})
	}, [])

	const checkPhone = async () => {
		setLoading(true)
		const response = await APIKit.post("user/referral/add", { "referral_mobile": phone });
		console.log(response);
		setCheckUser(true)
		setLoading(false)
		if (response.data.status === 200)
			setNewUser(true)
		else if (response.data.status === 400)
			setNewUser(false)

		else {
			console.log("444", response.data.msg);
			Snackbar.show({
				text: response.data.msg,
				duration: Snackbar.LENGTH_SHORT,
				action: {
					text: strings('close'),
					textColor: 'white',
					onPress: () => { /* Do something. */ },
				},
			});
		}
	};
	const getFirstChar = (str) => {
		if (str) {
			let matches = str.match(/\b(\w)/g);
			let acronym = matches.join('');
			return acronym.toUpperCase()
		}else{
			return ""
		}
	}
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<ScrollView style={styles.container} >
				<Text style={styles.title}>{strings('Refer a friend & save')}</Text>
				<Text style={styles.subTitle}>{strings('Referral program steps')}</Text>
				<View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: h(27) }}>
					<View style={{ alignItems: 'center' }}>
						<SVGs source="Circle1" width={w(42)} height={h(42)} style={styles.inputIcon} />
						<Text style={styles.stepTitle}>{strings('Invite')}</Text>
						<Text style={styles.stepSubTitle}>{strings('Invite a friend or family member using the field below')}</Text>
					</View>
					<View style={{ alignItems: 'center', marginHorizontal: w(34) }}>
						<SVGs source="Circle2" width={w(42)} height={h(42)} style={styles.inputIcon} />
						<Text style={styles.stepTitle}>{strings('First Order')}</Text>
						<Text style={styles.stepSubTitle}>{strings('Your referral get discount on his/her first order')}</Text>
					</View>
					<View style={{ alignItems: 'center' }}>
						<SVGs source="Circle3" width={w(42)} height={h(42)} style={styles.inputIcon} />
						<Text style={styles.stepTitle}>{strings('Your Discount')}</Text>
						<Text style={styles.stepSubTitle}>{strings('After your referral first order you get your voucher discount')}</Text>
					</View>
				</View>
				<SVGs source={I18nManager.isRTL ? "ReferFriendsAR" : 'ReferFriendsEN'} width={w(189)} height={h(252)} style={styles.referIcon} />
				<TextInput
					placeholder={strings("Phone Number")}
					placeholderTextColor={'#2F2F2F'}
					color={myColors.green3}
					style={[styles.input, { borderWidth: checkUser ? 1 : 0, borderColor: newUser ? myColors.green3 : myColors.red1 }]}
					autoFocus={false}
					value={phone}
					returnKeyType={"done"}
					onChangeText={value => setPhone(value)}
					keyboardType={'number-pad'}
				/>

				{checkUser && <View style={{ flexDirection: 'row', marginHorizontal: w(27), marginTop: h(15) }}>
					<AntDesign
						name={newUser ? 'checkcircle' : 'infocirlceo'}
						color={newUser ? myColors.green3 : '#F559B5'}
						size={15}
					/>
					<Text style={[styles.checkMess, { color: newUser ? myColors.green3 : myColors.red1 }]}>
						{strings(newUser ? 'discountMessage' : 'userExistMessage')}
					</Text>
				</View>}

				<TouchableOpacity onPress={() => checkPhone()} style={[styles.button, { backgroundColor: phone ? myColors.green3 : '#E5E5E5' }]}>
					{loading ? <ActivityIndicator size='small' color={'white'} /> : <TajwalBold style={[styles.buttonText, Platform.OS == 'ios' ? { lineHeight: 20 } : {}]} >
						{strings('Refer')}
					</TajwalBold>}

				</TouchableOpacity>
				{listData && <>
					<Text style={[styles.title, { marginTop: h(45) }]}>{strings('Previously Referred')}</Text>

					<View style={styles.referrd}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: w(22) }}>
							<Text style={styles.referredText}>{strings('Referral')}</Text>
							<Text style={styles.referredText}>{strings('Your Voucher')}</Text>
						</View>
						<FlatList
							// style={{ height: 120 }}
							data={listData}
							renderItem={({ item, index }) => (
								<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: w(22), marginVertical: h(16) }}>
									<View style={{ flexDirection: 'row' }}>
										<View style={[styles.nameBox, { backgroundColor: index % 3 == 1 ? '#DCE4FC' : index % 3 == 2 ? '#FDDEF0' : '#D7F1E2' }]}>
											<Text style={[styles.nameCapital, { color: index % 3 == 1 ? '#5377F0' : index % 3 == 2 ? '#F559B5' : '#39BA6D' }]}>{getFirstChar(item.full_name)}</Text>
										</View>
										<View style={{ marginHorizontal: w(13), alignItems: "flex-start" }}>
											<Text style={styles.name}>
												{
													item.full_name ? item.full_name : item.mobile
												}
											</Text>
											<Text style={styles.code}>{item.code}</Text>
										</View>
									</View>
									<Text style={styles.name}>{item.voucher ? item.voucher : strings('Pending')}</Text>
								</View>
							)}
							keyExtractor={(item, index) => index + ""}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				</>
				}
			</ScrollView>
		</SafeAreaView>
	);
};

export { ReferFriends };
