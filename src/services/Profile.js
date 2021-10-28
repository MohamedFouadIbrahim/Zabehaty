import APIKit from '../utils/APIKit';

export const getProfile = (onSuccess, onFailure) => {
    APIKit.get('user/profile').then((response) => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const updateProfile = (data, onSuccess, onFailure) => {
    APIKit.post('user/update', data).then((response) => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const updatePassword = ({ old_password, password }, onSuccess, onFailure) => {
    APIKit.post('user/update_password', { old_password, password }).then((response) => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const updateToken = ({ device_token}, onSuccess, onFailure) => {
    APIKit.post('user/update_token', { device_token}).then((response) => {
		console.log(response)
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const addBalance = ({ amount}, onSuccess, onFailure) => {
    APIKit.post('user/balance/payment', { amount}).then((response) => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const getBalanceHistory = (onSuccess, onFailure) => {
    APIKit.get('user/balance/history').then((response) => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}
