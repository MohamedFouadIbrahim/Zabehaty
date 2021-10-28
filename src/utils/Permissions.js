import Permission from 'react-native-permissions';
import { Platform } from 'react-native';

export const locationPermission = (onSuccess, onFailuer) => {

    const {
        PERMISSIONS: {
            IOS,
            ANDROID
        }
    } = Permission

    const PERMISSIONNAME = Platform.OS == 'ios' ? IOS.LOCATION_WHEN_IN_USE : ANDROID.ACCESS_FINE_LOCATION

    Permission.request(PERMISSIONNAME).then((result) => {
        if (result == 'granted') {
            onSuccess && onSuccess()
        } else {
            onFailuer && onFailuer(result)
        }
    }).catch((err) => {
        onFailuer && onFailuer(err)
    })
}

export const writeFilePermission = (onSuccess, onFailuer) => {


    const {
        PERMISSIONS: {
            IOS,
            ANDROID
        }
    } = Permission

    // const PERMISSIONNAME = Platform.OS == 'ios' ? IOS.STOREKIT : ANDROID.WRITE_EXTERNAL_STORAGE

    // Permission.request(PERMISSIONNAME).then((result) => {
    //     if (result == 'granted') {
    //         onSuccess && onSuccess()
    //     } else {
    //         onFailuer && onFailuer(result)
    //     }
    // }).catch((err) => {
    //     onFailuer && onFailuer(err)
    // })

    if (Platform.OS == 'android') {
        Permission.request(ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
            if (result == 'granted') {
                onSuccess && onSuccess()
            } else {
                onFailuer && onFailuer(result)
            }
        }).catch((err) => {
            onFailuer && onFailuer(err)
        }) 
    } else {
        onSuccess && onSuccess()
    }
}