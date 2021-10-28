import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Spinner from 'react-native-loading-spinner-overlay';


import {
	InputCountry,
	PhoneNumberInput,
} from "../../components";
import { styles } from "./styles";
import { icons } from "../../assets";

// Helpers
import APIKit from "../../utils/APIKit";

// SVGs
import EmirateFlag from '../../assets/SVGs/EmirateFlag'
import { strings } from "../../i18n";
import { SafeAreaView } from "react-native";
import { myColors } from "../../styles";

const CountryAndCurrency = ({ route }) => {
	const { navigate, goBack } = useNavigation();

	const [spinner, setSpinner] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState("")

	const [selectedSuggestCountry, setSelectedSuggestCountry] = useState(undefined)
	const [listOfSuggestedCountries, setListOfSuggestedCountries] = useState([])

	useEffect(() => {
		fetchSuggestedCountries()
	}, [])

	const fetchSuggestedCountries = async () => {
		try {
			const response = await APIKit.get("other_countries");

			console.log(response)
			if (response.data.status === 200) {
				if (response.data.data) {
					setListOfSuggestedCountries(response.data.data)
				}
			}
		}catch(error){
			console.log(error)
			if (error.response) {
				// Request made and server responded
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
		}
	}

	const submitSuggestedCountry = async () => {
		if (phoneNumber !== "" && selectedSuggestCountry) {
			setSpinner(true)

			try {
				const response = await APIKit.post('other_countries/request', {
					mobile: phoneNumber,
					country_id: selectedSuggestCountry.id
				})

				console.log(response)

				if (response.data.status === 200) {
					goBack()
				}else{
					Alert.alert(
						strings("Error"),
						response.data.msg,
						[
							{
								text: strings("Cancel"),
								onPress: () => console.log('Cancel Pressed'),
								style: 'cancel'
							},
						],
						{ cancelable: false }
					);
				}
				setSpinner(false)
			}catch(e) {
				console.log(e)
				setSpinner(false)
			}
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.content}>
				<View style={styles.container}>
					{
						(route.params && route.params.showHeader &&
							<View style={styles.header}>
								<TouchableOpacity
									activeOpacity={0.4}
									onPress={() => {
										// navigate("ChooseLanguage");
										goBack()
									}}
								>
									<Image
										source={icons.currencyheaderIcon}
										style={styles.headerIcon}
									/>
								</TouchableOpacity>
								<Text style={styles.headerText}>{ strings("Country") }</Text>
							</View>
						)
					}

					<View style={styles.logoContainer}>
						<Image source={icons.currencylogo} style={styles.logoImg} />
					</View>
					<Text style={[styles.currencyText, styles.sameBoldStyle]}>
						{ strings("Country") }
					</Text>
					<Text style={[styles.anyContryText, styles.sameRegularStyle]}>
						{ strings("In which country will you use Zabehaty?") }
					</Text>
					<InputCountry
						isImgComponent={ true }
						currencycountryicon={ <EmirateFlag width={ 30 } /> }
						currencytruemarkIcon={icons.currencytruemark}
						countryText={ strings("United Arab Emirates") }
						emirateCountry={styles.emirateCountryStyle}
						emirateText={styles.emirateText}
					/>

					<View style={{ height: 1, width: "100%", backgroundColor: myColors.green, marginBottom: 20 }}></View>

					<Text style={[styles.notEmirateText, styles.sameBoldStyle]}>
						{ strings("Not in the Emirates?") }
					</Text>
					<Text style={[styles.chooseContryText, styles.sameRegularStyle]}>
						{ strings("Choose your country and we will inform you as soon as we expand in the selected country") }
					</Text>
					{
						listOfSuggestedCountries.map( (country, index) => {
							return(
								<InputCountry
									key={ index }
									currencycountryicon={{ uri: country.image }}
									currencytruemarkIcon={ (selectedSuggestCountry && selectedSuggestCountry.id === country.id) ? icons.currencytruemark : undefined }
									countryText={ country.name }
									otherCountry={styles.otherCountryStyle}
									emirateText={styles.emirateText}
									onSelect={ () => setSelectedSuggestCountry(country) }
								/>
							)
						})
					}
					<PhoneNumberInput
						phoneValue={ phoneNumber }
						setPhoneValue={ setPhoneNumber }
					/>
				</View>
				<View style={styles.footer}>
					<TouchableOpacity
						onPress={() => {
							submitSuggestedCountry()
							//goBack()
							// navigate("OnBoardScreen");
						}}
					>
						<Text style={styles.footerText}>{ strings("Confirm") }</Text>
					</TouchableOpacity>
				</View>
				<Spinner
					visible={ spinner }
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export { CountryAndCurrency };
