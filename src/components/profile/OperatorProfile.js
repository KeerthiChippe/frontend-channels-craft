import { useState, useEffect, useContext } from "react";
import { OperatorContext } from "./operatorContext";
import { useDispatch } from "react-redux";
import { startUpdateUser } from "../../actions/user-action";
import { startEditOperator, startGetOperator } from "../../actions/operator-action";
import _ from "lodash"
import axios from "../../config/axios";

export default function OperatorProfile() {
    const dispatch = useDispatch()

<<<<<<< HEAD
    const {userState} = useContext(OperatorContext)
=======
    const { userState, userDispatch } = useContext(OperatorContext)
>>>>>>> 4edcc69fcf77dcfb087ead18eef90293c47d279a
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
   // const [role , setRole] = useState("")
    useEffect(() => {
        dispatch(startGetOperator())

    }, [dispatch])

    useEffect(()=>{
        if(localStorage.getItem('token').length > 0){
            setProfile(userState.userDetails.role)
        }
    }, [userState.userDetails.role])

    const userId = userState.userDetails._id
    const operatorId = userState.operator._id
    console.log(userId)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // useEffect(()=>{
    //     if(localStorage.getItem('token').length > 0){
    //       setImg(userState.operator.image)
    //     }
    //     console.log(userState.operator.image)
    //   }, [])
      

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
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
        } catch (e) {
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
            newPassword: '', 
            img: userState.operator.image
        });
    }, [userState])

    const handleUpload = (e) => {
        e.preventDefault()
        console.log(profile, "profile")



        if (profile) {
            const formData = new FormData()
            formData.append('file', profile)
            axios.put(`/api/operator/${operatorId}/profile`, formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log(res.data, "img result")
                    setImg({ ...img, ...res.data })
                })
                .catch(err => console.log(err))
        }
    }
    console.log(userState.operator.image, "profile")

    return (
        <div className="d-flex mt-5 justify-content-center align-items-center">
            {/* <h2>Account Details</h2>
            <p>username - {userState.userDetails.username}</p>
            <p>email - {userState.userDetails.email}</p>
            <p>mobile- {userState.userDetails.mobile}</p> */}

            {!_.isEmpty(formData.img) ? (
                <>
                    <img className="rounded-circle mb-3 profile"
                        src={`http://localhost:3034/Images/${formData.img}`} alt='avatar'
                        width="100px"
                        height="100px"
                    />
                </>
            ) : (
                <>
                    <img className="rounded-circle mb-3 profile"
                        src={process.env.PUBLIC_URL + '/service-pic.jpg'} alt='avatar'
                        width="100px"
                        height="100px"
                    />
                </>
            )}

            <form onSubmit={handleUpload}>
                <input type='file' onChange={(e) => {
                    setProfile(e.target.files[0])
                }} />

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
                        <input type='text' name='city' value={formData.city} onChange={handleChange} disabled />
                        <br />

                        <label>state</label>
                        <input type='text' name='state' value={formData.state} onChange={handleChange} disabled />
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