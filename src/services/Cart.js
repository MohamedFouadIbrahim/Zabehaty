import APIKit from '../utils/APIKit';

export const getCart = (onSuccess, onFailure) => {
    //APIKit.get('cart', { headers: { "branch-id": branchId } }).then((response) => {
	APIKit.get('cart').then((response) => {
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

export const addToCart = (cartData, onSuccess, onFailure) => {
    //department_id
    //category_id
    //product_id
    //sub_product_id
    //quantity
    APIKit.post('cart/add', { ...cartData }).then((response) => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            console.log('ererererer')
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const editCart = ({ cartDetailsId, quantity }, onSuccess, onFailure) => {
    APIKit.post('cart/edit', { cart_detail_id: cartDetailsId, quantity }).then((response) => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}
export const removeFromCart = ({ cartDetailsId }, onSuccess, onFailure) => {
    APIKit.post('cart/delete', { cart_detail_id: cartDetailsId }).then((response) => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const emptyCart = ({ cart_id }, onSuccess, onFailure) => {
    APIKit.post('cart/empty', { cart_id: cart_id }).then((response) => {
        if (response.status == 200) {
            console.log("response::>>",response);
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        console.log("errror::>>");
        onFailure && onFailure(erorr)
    })
}
