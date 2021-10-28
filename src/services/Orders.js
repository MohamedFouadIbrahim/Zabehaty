import APIKit from '../utils/APIKit';

export const getOrders = (onSuccess, onFailure) => {
    APIKit.get('user/orders').then(response => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        console.log("error in get order",erorr.response)
        onFailure && onFailure(erorr)
    })
}

export const rateOrder = ({ order_id, rating, rating_reason_id, rating_suggestion }, onSuccess, onFailure) => {
    APIKit.post('user/rate-order', { order_id, rating, rating_reason_id, rating_suggestion }).then(response => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const ratingReasons = (onSuccess, onFailure) => {
    APIKit.get('rating-reasons').then(response => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const getOrderLocation = (orderId, onSuccess, onFailure) => {
    APIKit.post('user/track-order', { order_id:orderId }).then(response => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}
