import APIKit from '../utils/APIKit';

//branch_id,
export const getAddresses = (onSuccess, onFailure) => {

	//?branch_id=${branch_id}
    APIKit.get(`user/addresses`).then(response => {
		console.log(response)
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
		console.log(erorr)
        onFailure && onFailure(erorr)
    })
}

export const addAddress = (data, onSuccess, onFailure) => {
    console.log(data)
    APIKit.post('user/address/add', { ...data }).then(response => {
        console.log(response)
        if (response.status == 200 || response.status == 201) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        console.log(erorr)
        onFailure && onFailure(erorr)
    })
}

export const editAddress = (data, onSuccess, onFailure) => {
    APIKit.post('user/address/update', { ...data }).then(response => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const deleteAddress = (addressId, onSuccess, onFailure) => {
    APIKit.post('user/address/delete', { address_id: addressId }).then(response => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}
