{order.paid?.map(ele => ele.packages.map((pack) => {
  console.log(order.paid, "pay pack")
  const originalDate = new Date(ele.orderDate);
  const futureDate = addDays(originalDate, 30);
  const formattedDate = format(futureDate, 'yyyy-MM-dd');
  return (
    <Col key={pack._id} sm={6}>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{pack.packageId?.packageName}</Card.Title>
          <Card.Text>
            Expiry Date: {formattedDate}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}))}



      












//  <div>
//  {role === 'customer' && (
//    <div>
//      <form onSubmit={handleSubmit}>
//        <label>Name</label>
//        <input
//          type="text"
//          value={formData.customerName}
//          onChange={handleChange}
//          name="customerName"
//          disabled
//        />
//        <br />


//        <label>Mobile</label>
//        <input
//          type="text"
//          name="mobile"
//          value={formData.mobile}
//          onChange={handleChange}
//        />
//        <br />

//        <label>Box Number</label>
//        <input
//          type="string"
//          name="boxNumber"
//          value={formData.boxNumber}
//          onChange={handleChange}
//        />
//        <br />

//        <label>Address</label>
//        <br />
//        <label>Door Number</label>
//        <input
//          type="text"
//          value={formData.address.doorNumber}
//          name="doorNumber"
//          onChange={(e) =>
//            setFormData({
//              ...formData,
//              address: { ...formData.address, doorNumber: e.target.value }
//            })
//          }
//          disabled
//        />
//        <br />

//        <label>Street</label>
//        <input
//          type="text"
//          value={formData.address.street}
//          name="street"
//          onChange={(e) =>
//            setFormData({
//              ...formData,
//              address: { ...formData.address, street: e.target.value }
//            })
//          }
//          disabled
//        />
//        <br />

//        <label>City</label>
//        <input
//          type="text"
//          value={formData.address.city}
//          name="city"
//          onChange={(e) =>
//            setFormData({
//              ...formData,
//              address: { ...formData.address, city: e.target.value }
//            })
//          }
//          disabled
//        />
//        <br />

//        <label>State</label>
//        <input
//          type="text"
//          value={formData.address.state}
//          name="state"
//          onChange={(e) =>
//            setFormData({
//              ...formData,
//              address: { ...formData.address, state: e.target.value }
//            })
//          }
//          disabled
//        />
//        <br />

//        <label>Pincode</label>
//        <input
//          type="text"
//          value={formData.address.pincode}
//          name="pincode"
//          onChange={(e) =>
//            setFormData({
//              ...formData,
//              address: { ...formData.address, pincode: e.target.value }
//            })
//          }
//          disabled
//        />
//        <br />

//     {Object.keys(order.paid).length > 0 ? (
//      <div>
//        {
//          order.paid.packages.map(ele => (
//            <>
//              <label>Current Packages</label>
//              <input 
//                type='text'
//                value={ele.packageId.packageName}
//                name='currentPackages'
//                onChange={handleChange}
//                disabled
//              />
//              <br />
//            </>
//          ))
//        }
//      </div>
//     ) : (
//      <p>No packages available</p> 
//     )} 

//    {Object.keys(order.paid).length > 0 ? (
//      <div>
//        {
//          order.paid.channels.map(ele => (
//            <>
//              <label>Current Channels</label>
//              <input 
//                type='text'
//                value={ele.channelId.channelName}
//                name='currentChannels'
//                onChange={handleChange}
//              />
//              <br />
//            </>
//          ))
//        }
//      </div>
//    ): ( 
//       <p>No channels available</p> 
//     )}  

//     {order.paid.orderDate && (
//        <p>Expiry Date - {expiryDate.toString()}-</p>
//     )} 


//    <label>Old Password</label>
//    <input
//      type="password"
//      name="oldPassword"
//      value={formData.oldPassword}
//      onChange={handleChange}
//    />
//    <br />

//        <label>New Password</label>
//        <input
//          type="password"
//          name="newPassword"
//          value={formData.newPassword}
//          onChange={handleChange}
//        />
//        <br />
       
//    <input type="submit" />
 
//      </form>
//    </div>
// </div>
    






{/* <img
className="rounded-circle mb-3 profile"
src={!_.isEmpty(formData.img) ? `http://localhost:3034/Images/${formData.img}` : process.env.PUBLIC_URL + '/service-pic.jpg'}
alt='image'
width="100px"
height="100px"
onClick={handleImageClick}
/>

<Modal show={showModal} onHide={() => setShowModal(false)}>
<Modal.Header closeButton>
  <Modal.Title>Upload Image</Modal.Title>
</Modal.Header>
<Modal.Body>
  <form onSubmit={handleUpload}>
    <input type="file" onChange={handleImageChange} />
    <input type="submit" value="Upload" />
  </form>
</Modal.Body>
</Modal> */}



// if (profile) {
//     const formData = new FormData()
//     formData.append('file', profile)

//     axios.put(`/api/customer/${customerId}/profile`, formData, {
//       headers: {
//         Authorization: localStorage.getItem('token')
//       }
//     })

//       .then(res => {
//         console.log(res.data.image, formData.img, "img result1")

//         setShowModal(false);

//         userDispatch({
//           type: "SET_CUSTOMER_IMAGE",
//           payload: res.data.image
//         })
//       })
//       .catch(err => console.log(err))
//   }


// img: userState.customer.image



// useEffect(() => {
//     if (localStorage.getItem('token').length > 0) {
//       setRole(userState.userDetails.role)
//     }
//   }, [userState.userDetails.role])


// const handleImageClick = () => {
//     setShowModal(true);
//   }

//   const handleImageChange = (e) => {
//     console.log(e.target.files[0], "pro")

//     setProfile(e.target.files[0]);
//   }
