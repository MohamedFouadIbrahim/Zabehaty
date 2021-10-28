import { InputField } from "../InputField";
import * as React from "react";
import { View, Image } from "react-native";
import { CustomImage } from "../Image";
import { myColors } from "../../styles/myColors";
import { styles } from "./styles";
import { Button } from "../Button";
const { memo } = React;

export const AuthInput = memo(
	({
		ref,
		icon,
		isIcon,
		value,
		placeholder,
		placeholderTextColor,
		secureTextEntry,
		isPassword,
		toggleVisiblity,
		InputContStyle,
		inputStyle,
		keyboardType,
		imgStyle,
		onFocus,
		onBlur
	}) => (
		<View style={[styles.container, InputContStyle]}>
			<InputField
				ref={ ref }
				value={value}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				placeholderTextColor={placeholderTextColor || myColors.gray1}
				style={[styles.inputStyle, inputStyle]}
				keyboardType={keyboardType}
				autoFocus={ false }
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			{isIcon && <Image source={icon} style={[styles.imgStyle, imgStyle]} />}

			{isPassword && (
				<Button onPress={toggleVisiblity}>
					<CustomImage source={icon} imageStyle={styles.imgStyle} />
				</Button>
			)}
		</View>
	)
);
