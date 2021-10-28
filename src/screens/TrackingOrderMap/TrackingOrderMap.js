import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useInterval } from '../../hooks';
import { getOrderLocation } from '../../services/Orders';
import { locationPermission } from '../../utils';
import { icons } from '../../assets'
import MapStyle from './MapStyle.json';
import { styles } from './styles';
import { TajwalRegular, Row, TajwalMedium } from '../../components'

const TrackingOrderMap = ({ route }) => {

    const {

        params: {
            address: {
                lat,
                lng
            }
        }
    } = route

    const GOOGLE_MAPS_APIKEY = 'AIzaSyBFCnlrpNKXtVn8YROYBO8N52SRzOhP8JA';

    const [orderCoords, setOrderCoords] = useState({ latitude: 24.488180, longitude: 54.354950 })

    useInterval(() => {
        //20159
        getOrderLocation(route?.params?.orderId, ({ data: { lat, lng } }) => {

            if (orderCoords?.latitude != lat || orderCoords?.longitude != lng) {
                setOrderCoords({ latitude: Number(lat), longitude: Number(lng) })
                setCurrentLocation(prev => ({ ...prev, latitude: Number(lat), longitude: Number(lng) }))
            }
        })
    }, 5000)


    const defaultRegion = {
        // latitude: 37.78825,
        // longitude: -122.4324,
        ...orderCoords,
        latitudeDelta: 0.115,
        longitudeDelta: 0.1121,
    }

    const [region, setRegion] = useState(defaultRegion)
    const [currentLocation, setCurrentLocation] = useState(defaultRegion)

    const onLocationPressed = () => {

        locationPermission(() => {

            Geolocation.getCurrentPosition((pos) => {

                const {
                    coords: {
                        latitude,
                        longitude,
                    }
                } = pos
                setCurrentLocation(prevrRegion => ({ ...prevrRegion, latitude, longitude }))

            }, () => { }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
        })
    }

    return (
        <SafeAreaView style={styles.container}  >
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{
                    ...StyleSheet.absoluteFill
                }}
                region={{
                    ...currentLocation
                }}
                initialRegion={region}
                customMapStyle={MapStyle}
                removeClippedSubviews={true}
            >


                <Marker coordinate={{ ...orderCoords }} tracksInfoWindowChanges tracksViewChanges   >
                    <Image source={icons.DeliveryCarImage} style={{width:50, height:50, borderRadius:25 }} />
                </Marker>

                <MapViewDirections
                    origin={orderCoords}
                    destination={{ ...region, latitude: Number(lat), longitude: Number(lng) }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeColor={'#30BE76'}
                    strokeWidth={5}
                />

            </MapView>

            <TouchableOpacity
                onPress={() => { onLocationPressed() }}
                style={[styles.currentLocationButton, {}]}
            >
                <Image
                    source={icons.locationbutton}
                    resizeMode='contain'
                />
            </TouchableOpacity>

            {/* <View style={styles.dirverContainer} >
                <Row style={styles.dirverRowContainer} >

                    <Image source={icons.person} />

                    <Row style={styles.dirverInfoRowContainer} >

                        <View style={styles.textsContainer} >
                            <TajwalRegular
                                style={styles.onWayText}
                            >
                                فرمان في الطريق إليك
                            </TajwalRegular>

                            <Row style={styles.imageRowContainer} >
                                <Image
                                    source={icons.callAnswer}
                                    resizeMode='contain'
                                />

                                <TajwalRegular
                                    style={styles.numberText}
                                >
                                    +971 433 454 3456
                                </TajwalRegular>

                            </Row>
                        </View>

                        <View style={styles.textsContainer} >

                            <TajwalMedium
                                style={styles.driveTimeText}
                            >
                                موعد الوصول
                            </TajwalMedium>

                            <TajwalRegular
                                style={styles.driveTimeTextValue}
                            >
                                2:00 PM
                            </TajwalRegular>

                        </View>

                    </Row>
                </Row>
            </View> */}

        </SafeAreaView>
    )
}

export { TrackingOrderMap };
