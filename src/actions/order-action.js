import axios from "../config/axios"

export const startCreateOrder = (formData)=>{
    return async (dispatch)=>{
        try{
            const response = await axios.post('/api/orders', formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            dispatch(createOrder(response.data))
        }catch(e){
            console.log(e)
        }
    }
}

const createOrder = (data) =>{
    return {
        type: 'CREATE_ORDER',
        payload: data
    }
}

export const startGetPackage = () =>{
    return async(dispatch)=>{
        try{
            const response = await axios.get('/api/listAllPackages')
            console.log(response.data, "22")
            dispatch(setPackage(response.data))
        }catch(e){
            console.log(e)
        }
    }
}

const setPackage = (list)=>{
    return {
        type: 'SET_PACKAGE',
        payload: list
    }
}

export const selectedPackageOne = (data)=>{
    return{
        type: 'SELECTED_PACKAGE_ONE',
        payload: data
    }
}

export const selectedChannelOne = (data)=>{
    return{
        type: 'SELECTED_CHANNEL_ONE',
        payload: data
    }
}

export const deletePackageOne = (data)=>{
    console.log(data, "hhhhhhh")
    return{
        type: 'DELETED_PACKAGE_ONE',
        payload: data
    }
}