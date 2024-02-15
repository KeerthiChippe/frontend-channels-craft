const CustomerInitialState ={ data : []  ,serverErrors:[]}

const customerReducer =(state = CustomerInitialState ,action ) =>{
    switch(action.type){
        case "ADD_CUSTOMER" :{
            return {...state , data:[...state.data, action.payload]}
        }
        case 'SET_CUSTOMER' :{
            return { ...state , data:action.payload}
        }
        case 'REMOVE_CUSTOMER' :{
            console.log(action.payload, 'dddd')
            const newData = state.data.filter(customer => customer._id !== action.payload)
            console.log(newData)
            return{ ...state , data:newData}
        }
        case 'EDIT_CUSTOMER' :{
            {console.log(action.payload, "checking1234")}
            return { ...state , data : state.data.map ((customer) =>{
                if(customer._id === action.payload._id){
                    return {...customer , mobile:action.payload.mobile}
                }else{
                    return { ...customer}
                }
            })}
        }
        case 'SET_SERVER_ERRORS':{
            return {
                ...state,
                serverErrors: action.payload,
            }
        }
        default :{
            console.log(state, "keerthi")
            return{...state}
        }
    }
}
export default customerReducer