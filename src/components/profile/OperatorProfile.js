import { useState, useEffect, useContext } from "react";
import { OperatorContext } from "./operatorContext";
import { useDispatch } from "react-redux";
import { startUpdateUser } from "../../actions/user-action";
import { startEditOperator, startGetOperator } from "../../actions/operator-action";
import _ from "lodash"
import axios from "../../config/axios";

export default function OperatorProfile(){
    const dispatch = useDispatch()

    const {userState} = useContext(OperatorContext)
    const [formData, setFormData] = useState({
        operatorName: userState.userDetails.username,
        mobile: userState.userDetails.mobile,
        state: userState.operator.state,
        city: userState.operator.city,
        oldPassword: '',
        newPassword: ''
    })

    const [profile, setProfile] = useState(null)
    const [img, setImg] = useState({})

    useEffect(()=>{
        dispatch(startGetOperator())

    }, [dispatch])

    const userId = userState.userDetails._id
    const operatorId = userState.operator._id
    console.log(userId)

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            dispatch(startUpdateUser(userId, {
                "oldPassword": formData.oldPassword,
                "newPassword": formData.newPassword
            }))
            dispatch(startEditOperator(operatorId, {
                "mobile": formData.mobile
            }))
            setFormData({
                ...formData,
                oldPassword: "",
                newPassword: "",
              });
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        setFormData({
            operatorName: userState.userDetails.username,
            mobile: userState.userDetails.mobile,
            state: userState.operator.state,
            city: userState.operator.city,
            oldPassword: '',
            newPassword: ''
        });
    }, [userState])

    const handleUpload = (e)=>{
        e.preventDefault()
        console.log(profile, "profile")

        const formData= new FormData()
        formData.append('file', profile)
    
        if(profile){
            axios.put(`/api/operator/${operatorId}/profile`, formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log(res.data, "img result")
                    setImg({...img, ...res.data})
                })
                .catch(err => console.log(err))  
        }
    }

    return(
        <div>
            {/* <h2>Account Details</h2>
            <p>username - {userState.userDetails.username}</p>
            <p>email - {userState.userDetails.email}</p>
            <p>mobile- {userState.userDetails.mobile}</p> */}

            {!_.isEmpty(img) &&  
            <img 
            src={`http://localhost:3034/Images/${img.image}`} alt ='image'
            />}

            <form onSubmit={handleUpload}>
                <input type='file' onChange={(e) =>{
                    setProfile(e.target.files[0])
                }}/>

                <input type="submit" value="Upload" />
            </form>

            {userState.userDetails.role === 'operator' && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>name</label>
                        <input type="text" value={formData.operatorName} name='operatorName' onChange={handleChange} disabled />
                        <br />

                        <label>mobile</label>
                        <input type="text" name='mobile' value={formData.mobile} onChange={handleChange} />
                        <br />

                        <label>city</label>
                        <input type='text' name='city' value={formData.city} onChange={handleChange} disabled/>
                        <br />

                        <label>state</label>
                        <input type='text' name='state' value={formData.state} onChange={handleChange} disabled/>
                        <br />

                        <label>old password</label>
                        <input type='password' name='oldPassword' value={formData.oldPassword} onChange={handleChange} />
                        <br />

                        <label>new password</label>
                        <input type='password' name='newPassword' value={formData.newPassword} onChange={handleChange} />
                        <br />

                        <input type='submit' />
                    </form>
                </div>
            )}
          
        </div>
    )

}