import React from "react";
import { Text, View, TouchableOpacity, ImageBackground, Image } from "react-native";
import { styles } from "./styles";


const DepartmentShopping = ({ title, departmentImage, onPress }) => {
	return (
		<View style={styles.cellContainer}>
			<TouchableOpacity
				style={styles.deparmentCard}
				activeOpacity={0.9}
				onPress={ onPress }
			>
				{/* <Text styles={styles.discountText}>-50%</Text> */}
				<View style={ styles.departmentImageContainer }>
					<Image source={{ uri: departmentImage }} style={styles.departmentImage} />
				</View>
				{ /*<ImageBackground source={{ uri: departmentImage }} style={styles.departmentImage}>
					<View style={styles.discountTexts}>
						<Text style={styles.discountText}>-50%</Text>
					</View>
				</ImageBackground>*/ }
				<View style={styles.departmentInfoTexts}>
					<Text style={styles.titleText}>{title}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export { DepartmentShopping };
