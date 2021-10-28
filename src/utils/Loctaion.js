import Geocoder from 'react-native-geocoding';

export const initGoecoding = () => {
    Geocoder.init("AIzaSyBFCnlrpNKXtVn8YROYBO8N52SRzOhP8JA")
}

export const getAddressFromCoords = (lat, lng, onSucess, onFailuer) => {

    Geocoder.from({ latitude: lat, longitude: lng }).then(result => {
        onSucess && onSucess(result)
    }).catch(err => {
        onFailuer && onFailuer(err)
    })
}

