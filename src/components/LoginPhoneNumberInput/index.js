import React, { useState } from "react";
import { View, Text, I18nManager } from "react-native";
import { icons } from "../../assets";
import { myColors } from "../../styles";
import { Button } from "../Button";
import { AppCountryPicker } from "../CountryPicker";
import { CustomImage } from "../Image";
import { InputField } from "../InputField";
import { Row } from "../Row";
import styles from "./styles";

import { strings } from "../../i18n"

const LoginPhoneNumberInput = ({ phoneValue, setPhoneValue, setCountryCode }) => {
	const [callingCode, setCallingCode] = useState(["971"]);
	const [visible, setVisible] = useState(false);

	const phoneNumberTyped = (phone) => {
		const newPhoneNumber = phone.replace(/^0+/, '')
		setPhoneValue(newPhoneNumber)
	}

	return (
		<Row style={[ styles.Cont, (I18nManager.isRTL) ? { flexDirection: "row-reverse" } : {} ]}>
			<Button
				onPress={() => {
					setVisible(true);
				}}
				style={styles.countryPicker}
			>
				<Row style={ (I18nManager.isRTL) ? { flexDirection: "row-reverse" } : {} }>
					<AppCountryPicker
						onSelectCountry={(value) => {
							setCountryCode(value);
							setCallingCode(value);
							setVisible(false);
						}}
						onClose={() => {
							setVisible(false);
						}}
						visible={visible}
					/>
					<Text style={styles.phoneTitle}>+{callingCode}</Text>

					<CustomImage source={icons.dropdown} imageStyle={styles.imgStyle} />
				</Row>
			</Button>
			<InputField
				placeholder={ strings("Phone number") } //"ادخل رقم الهاتف"
				placeholderTextColor={myColors.black}
				style={[ styles.input, styles.customPhoneStyle]}
				value={ phoneValue }
				onChangeText={ (value) => phoneNumberTyped(value) }
				keyboardType={"number-pad"}
			/>
		</Row>
	);
};
export { LoginPhoneNumberInput };
