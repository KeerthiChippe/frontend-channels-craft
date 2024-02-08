import *as yup from 'yup'
import { useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from './config/axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './login.css'

const loginValidationSchema = yup.object({
    mobile: yup.string().required("mobile number is required").min(10).max(10),
    password: yup.string().required("password is required").min(8).max(128)
})

export default function Login(props) {
    const navigate = useNavigate()
    const { handleLogin, loginToast } = props
    const [serverErrors, setServerErrors] = useState([])
    const formik = useFormik({
        initialValues: {
            mobile: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                const formData = { mobile: values.mobile, password: values.password }
                console.log(formData)
                const response = await axios.post('/api/users/login', formData)
                console.log(response)
                // console.log(response.data,'srini')
                const userData = response.data
                // console.log(userData.role, "check")
                localStorage.setItem('token', userData.token)
                handleLogin(userData)
                loginToast()
                navigate('/')
            } catch (error) {
                if (error.response && error.response.data) {
                    const serverErrors = error.response.data.errors || []
                    setServerErrors(error)
                    console.log(error)
                  } else {
                    console.error("Unexpected error:", error)
                  }
            }
        }
    })
    return (
        <div className="wrapper d-flex bg-light align-items-center justify-content-center w-100" >
            <div className='login rounded'>
                <h2 className='mb-3'>Login</h2>
                <form className='form-validation' onSubmit={formik.handleSubmit}>
                    <div className='form-group mb-2'>
                        <label htmlFor='mobile number' className='form-label'>Mobile Number</label>
                        <input type="text"
                            className={`form-control ${formik.touched.mobile && formik.errors.mobile ? 'is-invalid' : ''}`} 
                            //className='form-control' 
                            value={formik.values.mobile}
                            name="mobile"
                            onChange={formik.handleChange} />
                        
                        <div className='invalid-feedback'>
                        {formik.errors.mobile}
                        </div>


                        <br />
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='password' className='form-label'>Password</label><br />
                        <input type="password"
                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} 
                           // className='form-control'
                            value={formik.values.password}
                            name="password"
                            onChange={formik.handleChange} />
                        
                        <div className='invalid-feedback'>
                        {formik.errors.password}
                        </div>
                    </div>
                    {serverErrors.length > 0 && (
                        <div className="alert alert-danger" role="alert">
                            {serverErrors.map((error, index) => (
                                <p key={index}>{error.msg}</p>
                            ))}
                        </div>
                    )}
                    <button type="submit" className='btn btn-success block mt-2' value={'login'} >
                        Login
                    </button>
                   
                </form>
                <div style={{ textAlign: 'right' }}>
                <Link to='/forgot-password' >Forgot Password ?</Link>
                </div>
            </div>
        </div>
    )
}