const ordersInitialState = {cart: [], packages: [], channels: [], paid: {}}

export const orderReducer = (state = ordersInitialState, action) =>{
    switch (action.type){
        case 'CREATE_ORDER': {
            console.log(action.payload, "cart api")
            return {...state, cart: [...state.cart, action.payload]}
        }
        case 'SET_ORDER': {
            return {...state, paid: {...state.paid, ...action.payload}}
        }
        case 'SELECTED_PACKAGE_ONE': {
            return {...state, packages: [...state.packages, {...action.payload}]}
        }
        case 'SELECTED_CHANNEL_ONE': {
            return {...state, channels: [...state.channels, action.payload]}
        }
        case 'DELETED_PACKAGE_ONE':{
            console.log(action.payload, "kkkkk")
            return {...state, packages: state.packages.filter(ele => ele._id !== action.payload)}
        }
        default: {
            return {...state}
        }
    }
}