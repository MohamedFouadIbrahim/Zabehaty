import React, { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { TajwalRegular } from '../../components';
import { styles } from "./styles";

// Helpers
import { icons } from "../../assets";
import { onChange } from "react-native-reanimated";

const Without = ({ list, onChange }) => {

	const [selectedItems, setSelectedItems] = useState([])
	const [selectedItemsObj, setSelectedItemsObj] = useState([])

	useEffect(() => {
		onChange(selectedItemsObj)
	}, [selectedItemsObj])

	const selectWithout = (item) => {
		if (selectedItems.includes(item.id)) {
			setSelectedItems(prevState => prevState.filter(row => row !== item.id))
			setSelectedItemsObj(prevState => prevState.filter(row => row.id !== item.id))
		} else {
			setSelectedItems(prevState => [ ...prevState, item.id])
			setSelectedItemsObj(prevState => [ ...prevState, item])
		}
	}

	return (
		<View>
			{
				list.map( (item, index) => {
					return(
						<React.Fragment key={ index }>
							<TouchableOpacity activeOpacity={ 0.7 } onPress={ () => selectWithout(item) } style={styles.withoutContainer}>
								<TajwalRegular style={[styles.type, (selectedItems.includes(item.id)) ? styles.selected : {} ]}>{ item.value }</TajwalRegular>
								{
									(selectedItems.includes(item.id) &&
										<Image source={icons.cancelimg} />
									)
								}
							</TouchableOpacity>
							<View style={styles.hr}></View>
						</React.Fragment>
					)
				})
			}

		</View>
	);
};

export { Without };
