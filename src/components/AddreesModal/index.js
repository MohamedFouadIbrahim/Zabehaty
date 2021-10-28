import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { icons } from '../../assets';
import { strings } from '../../i18n';
import { Row, TajwalRegular, } from '../../components';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export const AddreesModal = ({ isVisible, onHide, onFinish }) => {

    const navigation = useNavigation()

    const [city, setCity] = useState()
    const [region, setRegion] = useState()

    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={() => { onHide && onHide() }}
            onBackdropPress={() => {
                // onHide && onHide()
            }}
        >

            <View
                style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 10
                }}
            >

                <TajwalRegular
                    style={{ marginBottom: 20, }}
                >
                    {strings("Please Select Your Area")}
                </TajwalRegular>

                <Row style={styles.cityCountryContainer} >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.cityCountryButtons}
                        onPress={() => {
                            onHide && onHide()
                            navigation.navigate('CountryCitySelectore', {
                                isArea: false,
                                isCity: true,
                                onSelectPlace: (place) => {
                                    setCity(place);
                                }
                            })
                        }}
                    >
                        <Row style={styles.arrowDownContainer} >

                            <Image source={icons.ArrowDown} resizeMode='contain' style={styles.arrowDown} />
                            <TajwalRegular>
                                {city?.name || strings('City')}
                            </TajwalRegular>
                            {!city?.name ? <TajwalRegular style={styles.required} >*</TajwalRegular> : null}
                        </Row>

                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.cityCountryButtons}
                        onPress={() => {
                            onHide && onHide()
                            navigation.navigate('CountryCitySelectore', {
                                isArea: true,
                                isCity: false,
                                emirate_id: city?.id,
                                onSelectPlace: (place) => {
                                    setRegion(place)
                                    onFinish && onFinish(city, place)
                                }
                            })
                        }}
                    >
                        <Row style={styles.arrowDownContainer} >

                            <Image source={icons.ArrowDown} resizeMode='contain' style={styles.arrowDown} />
                            <TajwalRegular>
                                {region?.name || strings('Area')}
                            </TajwalRegular>

                            {!region?.name ? <TajwalRegular style={styles.required} >*</TajwalRegular> : null}
                        </Row>
                    </TouchableOpacity>

                </Row>

            </View>

        </Modal>
    )
}