const userReducer = (state, action) =>{
    switch (action.type){
        case 'SET_USER':{
            return {...state, userDetails:action.payload}
        }
        case 'SET_OPERATOR_PROFILE':{
            return {...state, operator: action.payload}
        }
        case 'SET_CUSTOMER_PROFILE': {
            return {...state, customer: action.payload}
        }
    }
}

export default userReducer