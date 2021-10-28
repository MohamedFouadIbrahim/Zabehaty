import APIKit from '../utils/APIKit';

export const checkoutSettings = ({ cartId, day, date }, onSuccess, onFailure) => {

    let data = {}

    if (day) {
        data = {
            cart_id: cartId,
            day,
        }
    } else if (date) {
        data = {
            cart_id: cartId,
            date: (date.day) ? date.day : date
        }
    } else {
        data = {
            cart_id: cartId
        }
    }

    APIKit.post('checkout/settings', { ...data }).then((response) => {
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

export const checkout = ({ cartId, promocode, redeem_points }, onSuccess, onFailure) => {
    let data = {}

    if (promocode) {
        data = {
            cart_id: cartId,
            promocode: promocode
        }
    } else if(redeem_points) {
        data = {
            cart_id: cartId,
            redeem_points: redeem_points
        }
    } else {
        data = {
            cart_id: cartId
        }
    }

    console.log('data', data)

    APIKit.post('checkout', { ...data }).then((response) => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })

}

export const createOrder = ({
    cart_id,
    address_id,
    date,
    day,
    time_from,
    time_to,
    payment_method,
    notes
}, onSuccess, onFailure) => {

    let data = {}
    if (date) {
        data = {
            cart_id,
            address_id,
            date,
            time_from,
            time_to,
            payment_method,
            notes
        }
    } else {
        data = {
            cart_id,
            address_id,
            day,
            time_from,
            time_to,
            payment_method,
            notes
        }
    }

    console.log(data)

    APIKit.post('orders/create', { ...data }).then((response) => {
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


export const getAvailablePromocodes = ({ cart_id }, onSuccess, onFailure) => {

    APIKit.post('promocodes', { cart_id }).then(response => {
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

export const availablePoints = ({ cart_id }, onSuccess, onFailure) => {
    APIKit.post('available_points_discount', { cart_id }).then((response) => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}
