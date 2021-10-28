import APIKit from '../utils/APIKit';

export const getEmirates = (onSuccess, onFailure) => {
    APIKit.get('emirates').then(response => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}

export const getBranch = (emirate_id, region_id, onSuccess, onFailure) => {
    APIKit.post('branches', { emirate_id, region_id }).then(response => {
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


export const getRegions = (emirate_id, onSuccess, onFailure) => {
    APIKit.post('regions', { emirate_id: emirate_id }).then(response => {
        if (response.status == 200) {
            onSuccess && onSuccess(response.data)
        } else {
            onFailure && onFailure(response)
        }
    }).catch((erorr) => {
        onFailure && onFailure(erorr)
    })
}
