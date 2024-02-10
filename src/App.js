import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "./config/axios";

import Home from "./Home/Home";
import Register from "./Register";
import Login from "./Login";
//import Packages from "./components/Packages";
import AddChannel from "./components/channels/AddChannels";
import Header from "./Home/navbar/header";
import Footer from "./Home/navbar/footer";
//import AddOperator from "./components/operator/AddOperator";
//import Image from "./multer";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import AddPackage from "./components/packages/AddPackage";
import ListPackages from "./components/packages/ListPackages";
import PackagesContainer from "./components/packages/PackagesContainer";
import OperatorContainer from "./components/operator/operatorcontainer";
import DeletedPackage from "./components/packages/DeletedPackage";
import AddCustomer from "./components/Customer/AddCustomer";
import UserContainer from "./components/user/userContainer";
import userReducer from "./useReducer-reducer/userReducer";
import OperatorProfile from "./components/profile/OperatorProfile";
import { OperatorContext } from "./components/profile/operatorContext";
import CreateOrder from "./components/orders/CreateOrder";
import CustomerProfile from "./components/profile/CustomerProfile";
import Navbar from "./Home/navbar/Navbar";
import Dashboard from "./Dashboard";

import CustomerList from "./components/Customer/listCustomers";
import CustomerContainer from "./components/Customer/customerContainer";

import { useDispatch } from "react-redux";
import { startGetUser } from "./actions/user-action";
import Failure from "./Payment/Failure";
import Success from "./Payment/Success";
import Payment from "./Payment/Pay";
import Cart from "./components/orders/Cart";
import OrderPayment from "./components/orders/OrderPayment";

function App(props) {
  const dispatch = useDispatch()
  const [userState, userDispatch] = useReducer(userReducer, {
    userDetails: {},
    operator: {},
    customer: {}, 
    cart:[],
    isLoggedIn: false
  })

  const registerToast = ()=>{
    toast('registerd successfully')
  }

  const loginToast =() =>{
    toast('logged in succesfully')
  }

  const resetPassword = ()=>{
    toast('password updated successfully')
  }

  const addOperator = ()=>{
    toast('added operator')
  }

  const addPackage = ()=>{
    toast('Successfully added package')
  }

  const addChannel = ()=>{
    toast('Successfully added channel')
  }
  
  useEffect(()=>{
    dispatch(startGetUser())
  }, [dispatch])

  useEffect(()=>{
    if(localStorage.length > 0){
      userDispatch({
        type: "SIGN_IN_TOGGLE",
        payload: true
    })
    }
  }, [dispatch, userState.isLoggedIn])

  
  useEffect(()=>{
    const fetchUserData = async ()=>{
      try{
        // if(localStorage.getItem('token')){
          const userDetails = await axios.get('/api/users/profile', {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
          // console.log(userDetails.data)
          userDispatch({type: 'SET_USER', payload: userDetails.data})

          if(userDetails.data.role === 'operator'){
            const operator = await axios.get('/api/operator/profile', {
              headers: {
                Authorization: localStorage.getItem('token')
              }
            })
            // console.log(operator.data)
            userDispatch({type: 'SET_OPERATOR_PROFILE', payload: operator.data})
          }

          if(userDetails.data.role === 'customer'){
            const customer = await axios.get('/api/customer/profile', {
              headers: {
                Authorization: localStorage.getItem('token')
              }
            })
            userDispatch({type: 'SET_CUSTOMER_PROFILE', payload: customer.data})
          }
        // }
      }catch(e){
        console.log(e)
      }
    }
    fetchUserData()
    }, [userDispatch])

   return (
    <div>
    <OperatorContext.Provider value={{userState, userDispatch}}>
    <BrowserRouter>
      <div className="app">
      <div className="app" style={{ backgroundColor: "#E9F1FA", minHeight: "100vh" }}>
       {/* <Header /> */}
       <Navbar />
        <Routes>
          <Route path='/' element={<Home/> }/>
          <Route path='/register' element={<UserContainer registerToast={registerToast}/>} />
          <Route path='/login' element={<Login loginToast = {loginToast} />}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword resetPassword={resetPassword} />} />
          <Route path='/operatorcontainer' element={<OperatorContainer addOperator={addOperator} />} />
          <Route path='/packages' element={<AddPackage addPackage={addPackage} />} />
          <Route path='/packcha' element={<PackagesContainer />} />
          <Route path='/channels' element = {<AddChannel addChannel={addChannel} />} />
          <Route path='/deletedPackages' element={<DeletedPackage />} />
          <Route path = '/customercontainer' element={<CustomerContainer />} />
          <Route path='/profile' element={<OperatorProfile />} />
          <Route path='/customerProfile' element={<CustomerProfile />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/order' element={<CreateOrder />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/failure' element={<Failure />} />
          <Route path='/success' element={<Success />} />
          <Route path='/pay' element={<Payment />} />
          <Route path='/orderpay' element={<OrderPayment />} />
        </Routes>
       
      </div>
      </div>
      <ToastContainer />
    </BrowserRouter>
    </OperatorContext.Provider>
  </div>
  );
}

export default App;
