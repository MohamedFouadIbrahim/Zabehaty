import React from "react"
import { View, Image, Text, TouchableOpacity, Platform } from "react-native"
import { AirbnbRating } from 'react-native-ratings';

// CSS
import { styles } from "./styles"


const Shop = ({ image, title, desc, info, rating, onPress, isSelected }) => {
	return (
		<TouchableOpacity activeOpacity={ 0.6 } onPress={ onPress } style={[ styles.shopContainer, (isSelected) ? styles.selected : {} ]}>
			<View style={ styles.imageContainer }>
				<Image source={{ uri: image }} style={styles.image} />
			</View>
			<View style={ styles.descriptionContainer}>
				<Text style={ [styles.titleText, Platform.OS == 'ios' ? { lineHeight: 22 } : {}]}>{ title }</Text>
				<Text style={styles.infoText} numberOfLines={ 2 }>{ desc }</Text>
				<View style={{marginTop: 0}}>
				{
					info.map((infoTxt, index) => {
						return(
							<View key={ index } style={ styles.infoContainer}>
								<Text style={styles.infoText} numberOfLines={ 1 }>{ infoTxt.value }</Text>
							</View>
						)
					})
				}
				</View>
				{/* <View style={styles.ratingContainer}>
					<AirbnbRating
						count={5}
						defaultRating={ (rating) ? rating : 0 }
						size={15}
						selectedColor='#215904'
						showRating={ false }
						isDisabled={ true }
					/>
				</View> */}
			</View>
		</TouchableOpacity>
	)
}

export { Shop }
