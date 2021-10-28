import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import { icons } from '../../assets';
import { CustomLeftHeader, Line, TajwalBold } from '../../components';
import { strings } from '../../i18n';
import { getBranch, getEmirates, getRegions } from '../../services/Places';
import { myColors } from '../../styles';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { setBranchId } from '../../utils/APIKit';
const PlacesSelectore = ({ route, navigation }) => {

    const currentBranch = useSelector(state => state.address.currentBranch)
    const {
        params: {
			forced,
            onSelectPlace,
        }
    } = route

    const [data, setData] = useState()
    const [emirate, setEmirate] = useState({})
    const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (forced) {
			BackHandler.addEventListener("hardwareBackPress", () => true);
			return () =>
				BackHandler.removeEventListener("hardwareBackPress", () => false);
		}
	}, []);

    useEffect(() => {
        if (emirate?.id) {
            setIsLoading(true)

            getRegions(emirate?.id, ({ data }) => {
                setData(data)
                setIsLoading(false)
            }, err => {
                setIsLoading(false)
            })

        } else {
            setIsLoading(true)

            getEmirates(({ data }) => {
                setData(data)
                setIsLoading(false)
            }, err => {
                setIsLoading(false)
            })

        }

        navigation.setOptions({
            headerLeft: () => currentBranch?.id ? <CustomLeftHeader isClose={false} /> : null,
            headerTitle: emirate?.id ? strings('SelectArea') : strings('SelectCity')
        })

    }, [emirate])

    const onSelectItem = (item) => {

        if (emirate?.id) { // item == region
            setIsLoading(true)
            getBranch(emirate?.id, item?.id, ({ data }) => {
				console.log("GET BRANCH")
				console.log(data)
                setBranchId(data)
                onSelectPlace(emirate, item, data);
                goBack()
                setIsLoading(false)
            }, err => {
                setIsLoading(false)
            })
        } else {
            setEmirate(item)
        }
    }

    const goBack = () => {
        navigation.goBack()
    }

    const renderItem = ({ item, index }) => (

        <TouchableOpacity onPress={() => onSelectItem(item)} style={styles.cityCountryItem} >

            <Image source={icons.location} resizeMode='contain' />

            <TajwalBold style={styles.cityCountryText} >
                {item.name}
            </TajwalBold>
        </TouchableOpacity>
    )

    if (isLoading) {
        return <ActivityIndicator color={myColors.green3} size='large' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    }
    return (
        <SafeAreaView
            style={styles.container}
        >
            <FlatList
                renderItem={renderItem}
                data={data}
                keyExtractor={(item, index) => String(index)}
                ItemSeparatorComponent={() => <Line style={styles.line} />}
                contentContainerStyle={styles.contentContainerStyle}
            />

        </SafeAreaView>
    )
}
export { PlacesSelectore };
