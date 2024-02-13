import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { addDays, format } from 'date-fns'
import axios from "../../config/axios";
import { useState, useEffect, useContext } from "react"
import { Modal } from "react-bootstrap"
import { OperatorContext } from "./operatorContext"
import { startUpdateUser } from "../../actions/user-action"
import { startEditCustomer } from "../../actions/customer-action"
import { StartGetCustomer } from "../../actions/customer-action"
import { startGetOrder } from "../../actions/order-action"
import { Row, Col } from "reactstrap"
// import {addDays} from 'date-fns'
// import './customerProfile.css'
import Calendar from "./Calendar";



const CustomerProfile = () => {
  const dispatch = useDispatch();
  const {userDispatch} = useContext(OperatorContext)


  // const customers = useSelector((state) => {
  //   return state.customer.data
  // })

  const { userState, userDispatch } = useContext(OperatorContext);
  const customers = useSelector((state) => {
    return state.customer.data
  })


  const order = useSelector((state) => {
    return state.order
  })
  // console.log(order, "current order")
  // console.log(order.packages, "kkk")
  console.log(order.paid, "date of order")
  // console.log(order.packages[0].packageName, "current packages")
  // console.log(order.channels[0].channelName, "current channels")

  const orderDate = order.paid
  console.log(orderDate, "expiry date")
  // const expiryDate = addDays(orderDate + 30)
  // const formattedExpiryDate = format(expiryDate, 'yyyy mm dd')
  // console.log(formattedExpiryDate, 'format date')

  useEffect(() => {
    dispatch(StartGetCustomer())
    dispatch(startGetOrder())
  }, [dispatch])


  const [formData, setFormData] = useState({
    customerName: userState.userDetails.username,
    mobile: userState.userDetails.mobile,
    boxNumber: userState.customer.boxNumber,
    address: {
      doorNumber: '',
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    oldPassword: '',
    newPassword: ''
  });
  const [profile, setProfile] = useState(null)


  const [img, setImg] = useState({})
  const [role, setRole] = useState("")


  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const userId = userState.userDetails._id;
  const customerId = userState.customer._id;

  useEffect(() => {
    if (localStorage.getItem('token').length > 0) {
      setRole(userState.userDetails.role)
    }
  }, [userState.userDetails.role])


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(startUpdateUser(userId, {
        "oldPassword": formData.oldPassword,
        "newPassword": formData.newPassword
      }));
      await dispatch(startEditCustomer(customerId, {
        "mobile": formData.mobile,
      }))
      setFormData({
        ...formData,
        oldPassword: '',
        newPassword: ''
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const { userDetails, customer } = userState;
    const customerAddress = customer.address || {};

    setFormData({
      customerName: userDetails.username || '',
      mobile: userDetails.mobile || '',
      boxNumber: customer.boxNumber || '',
      address: {
        doorNumber: customerAddress.doorNumber || '',
        street: customerAddress.street || '',
        city: customerAddress.city || '',
        state: customerAddress.state || '',
        pincode: customerAddress.pincode || ''
      },
      oldPassword: '',
      newPassword: '',
      img: userState.customer.image
    });
  }, [userState]);

  const handleUpload = (e) => {
    e.preventDefault()

    if (profile) {
      const formData = new FormData()
      formData.append('file', profile)

      axios.put(`/api/customer/${customerId}/profile`, formData, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

        .then(res => {
          console.log(res.data.image, formData.img, "img result1")

          setShowModal(false);

          userDispatch({
            type: "SET_CUSTOMER_IMAGE",
            payload: res.data.image
          })
        })
        .catch(err => console.log(err))
    }
  }

  console.log(userState, "im")

  const handleImageClick = () => {
    setShowModal(true);
  }

  const handleImageChange = (e) => {
    console.log(e.target.files[0], "pro")

    setProfile(e.target.files[0]);
  }


  return (
    <div className="d-flex justify-content-center align-items-center">
      {role === 'customer' && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={handleChange}
              name="customerName"
              disabled
            />
            <br />

            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <br />

            <label>Box Number</label>
            <input
              type="string"
              name="boxNumber"
              value={formData.boxNumber}
              onChange={handleChange}
            />
            <br />

            <label>Address</label>
            <br />
            <label>Door Number</label>
            <input
              type="text"
              value={formData.address.doorNumber}
              name="doorNumber"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, doorNumber: e.target.value }
                })
              }
              disabled
            />
            <br />

            <label>Street</label>
            <input
              type="text"
              value={formData.address.street}
              name="street"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, street: e.target.value }
                })
              }
              disabled
            />
            <br />

            <label>City</label>
            <input
              type="text"
              value={formData.address.city}
              name="city"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, city: e.target.value }
                })
              }
              disabled
            />
            <br />

            <label>State</label>
            <input
              type="text"
              value={formData.address.state}
              name="state"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, state: e.target.value }
                })
              }
              disabled
            />
            <br />

            <label>Pincode</label>
            <input
              type="text"
              value={formData.address.pincode}
              name="pincode"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, pincode: e.target.value }
                })
              }
              disabled
            />
            <br />

            {order.paid && order.paid.length > 0 && (
              <div>
                <label>Current Packages</label>
                {order.paid.map((ele) => (
                  <input
                    type='text'
                    value={ele.packageId.packageName}
                    name='currentPackages'
                    onChange={handleChange}
                    disabled
                  />
                ))}
                <br />
              </div>
            )}

            {order.paid && order.paid.length > 0 && (
              <div>
                <label>Current Channels</label>
                {order.paid.map((ele) => (
                  <input
                    type='text'
                    value={ele.channelId.channelName}
                    name='currentChannels'
                    onChange={handleChange}
                  />
                ))}
                <br />
              </div>
            )}

            {/* {order.paid && order.paid.orderDate && (
              <p>Expiry Date - {expiryDate.toString()}-</p>
            )} */}

            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
            />
            <br />

            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <br />

            <input type="submit" />
          </form>
        </div>
      )}
    </div>
  )



}



export default CustomerProfile
