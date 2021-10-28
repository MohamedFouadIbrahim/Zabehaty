import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
} from "react-native";
import { icons } from "../../assets/index";
import { styles } from "./styles";
import moment from 'moment';
import { strings } from '../../i18n';
import { TajwalBold } from '../../components'
import { myColors } from '../../styles';
const NotifactionCard = ({ item, index }) => {
	const [isOpened, setIsOpened] = useState(false)
	const [showIsShowMore, setShowIsShowMore] = useState(false)
	const [isShowMore, setIsShowMore] = useState(false)


	useEffect(() => {
		if (item.message) {
			if (item.message.length > 60) {
				setShowIsShowMore(true)
			}
		}
	}, [item.message])

	const getTime = (date) => {
		// moment.locale(this.props.lang);
		let end = moment(date).add(date, 'hours');
		let current = moment(new Date());
		let days = parseInt(moment.duration(moment(current).diff(moment(end))).asDays());
		let hours = parseInt(moment.duration(moment(current).diff(moment(end))).asHours()) % 24;
		let mins = parseInt(moment.duration(moment(current).diff(moment(end))).asMinutes() % (60));
		let sec = parseInt(moment.duration(moment(current).diff(moment(end))).asSeconds() % (60));
		let time = days > 0 ? days : hours > 0 ? hours : mins;

		let text = ""
		if (days > 0) {
			if (days <= 2) {
				text = strings('day')
			}else{
				text = strings('days')
			}
		}else if (hours > 0) {
			if (hours >= 2 || hours > 9) {
				text = strings('hour')
			}else{
				text = strings('hours')
			}
		}else{
			text = strings('minutes')
		}

		return (
			<Text color="black" size={4}>
				{strings('from') + time.toString() + " " + text}
			</Text>
		)
	}
	return (
		<TouchableOpacity style={[styles.deparmentCard, ( index % 2 > 0 ) ? styles.selectedCard : {}]} activeOpacity={0.9} onPress={() => setIsOpened(true)}>
			{/* <View style={styles.departmentImage}>
				<Image source={{ uri: departmentImage }} style={{ resizeMode: "cover", width: "100%", height: "100%"}} />
			</View> */}
			<View style={styles.headerConatiner}>
				<Text numberOfLines={!isShowMore ? 2 : 0} style={styles.titleText}>{item.message}</Text>
				<Text style={styles.dateText}>{getTime(item.created_at)}</Text>
			</View>

			{
				(showIsShowMore &&
					<>
						{!isShowMore && <TouchableOpacity onPress={() => { setIsShowMore(true) }} >
							<TajwalBold style={{ color: myColors.blue6 }} >
								{strings("ShowMore")}
							</TajwalBold>
						</TouchableOpacity>}
					</>
				)
			}

			{item.describtion && isShowMore && <Text style={styles.describtion}>{item.describtion}</Text>}


			{item.image && <Image source={{ uri: item.image }} style={styles.Image} />}

		</TouchableOpacity>
	);
};

export { NotifactionCard };
