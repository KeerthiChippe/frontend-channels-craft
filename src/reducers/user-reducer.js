const userIntialState = { data: [] }

const userReducer = (state = userIntialState , action) =>{
    switch (action.type){
        case 'SET_USER':{
            return {...state , data: action.payload}
        }
        case 'UPDATE_USER':{
            return {...state, data: state.data.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })}
        }
        default :{
            return state
        }
    }
}
export default userReducer