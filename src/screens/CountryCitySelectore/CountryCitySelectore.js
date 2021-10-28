import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { icons } from '../../assets';
import { Line, TajwalBold, CustomLeftHeader } from '../../components';
import { Row } from '../../components/Row';
import { strings } from '../../i18n';
import { getRegions, getEmirates } from '../../services/Places';
import { styles } from './styles';

const CountryCitySelectore = ({ route, navigation }) => {

    const {
        params: {
            isArea,
            isCity,
            onSelectPlace,
            emirate_id
        }
    } = route

    const [data, setData] = useState()

    useEffect(() => {
        if (isArea) {
            getRegions(emirate_id, ({ data }) => {
                console.log('yes')
                setData(data);
            }, err => {

            })

        }
        if (isCity) {
            getEmirates(({ data }) => { setData(data) })
        }

        navigation.setOptions({
            headerLeft: () => <CustomLeftHeader isClose={false} />,
            headerTitle: isArea ? strings('Selectdeliveryarea') : strings('Selectdeliverycity')
        })
    }, [])


    const onSelectItem = (item) => {

        if (isArea) {
            onSelectPlace({ ...item, type: 'Area' })
        } else {
            onSelectPlace({ ...item, type: 'Cty' })
        }

        goBack()
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
export { CountryCitySelectore };
