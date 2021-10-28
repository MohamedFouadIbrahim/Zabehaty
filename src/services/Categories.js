import APIKit from '../utils/APIKit';

export const getCategories = (onSuccess, onFailure) => {

    APIKit.get('categories').then(response => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}
