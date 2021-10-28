import APIKit from '../utils/APIKit';

export const addToContactUs = (data, onSuccess, onFailure) => {
    APIKit.post('contact-us', { ...data }).then(response => {
        if (response.status == 200 || response.status == 201) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const getContactUs = (onSuccess, onFailure) => {
    APIKit.get('contact-us-info').then(response => {
        if (response.status == 200 || response.status == 201) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

