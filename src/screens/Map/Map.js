import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Image, View, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import { CartButton, CartBackHeader } from '../../components';
import { strings } from '../../i18n';
import { styles } from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { locationPermission } from '../../utils';
import Geolocation from 'react-native-geolocation-service';
import { showToast } from '../../utils/Toast';
import { getAddressFromCoords } from '../../utils';
const Map = ({ route, navigation }) => {

    const {

        params: {
            defaultRegion,
            onSave
        }
    } = route

    const [region, setRegion] = useState(defaultRegion)
    const mapRef = useRef()

    const onPreesLocation = () => {
        locationPermission(() => {
            Geolocation.getCurrentPosition((pos) => {

                const {
                    coords
                } = pos

                setRegion(perv => ({ ...perv, latitude: coords.latitude, longitude: coords.longitude }))

                mapRef.current.animateToRegion({ ...region, latitude: coords.latitude, longitude: coords.longitude })

            }, () => {
                showToast("PlaeseCheckYourLoctaionServices")
            }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
        }, err => {
            showToast("PlaeseCheckYourLoctaionServices")
        })

    }
    return (
        <>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                ref={mapRef}
                initialRegion={region}
                onRegionChangeComplete={(myRegion) => {
                    setRegion({ ...myRegion })
                }}
            />

            <FontAwesome
                name='map-marker'
                size={40}
                style={styles.marker}
                color={'#ff3300'}
            />

            <TouchableOpacity
                style={styles.currentPosionButton}
                onPress={onPreesLocation}
            >
                <Ionicons name={'md-locate'} size={35} color={'black'} />
            </TouchableOpacity>

            <CartButton
                text={strings("Save")}
                onPress={() => {

                    getAddressFromCoords(region.latitude, region.longitude, res => {
                        onSave && onSave(region, res.results[0])
                        navigation.goBack()
                    }, err => {
                        onSave && onSave(region)
                        navigation.goBack()
                    })

                }}
                style={styles.saveButton}
            />
        </>
    )
}

export { Map }