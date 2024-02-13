import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startAddChannel, startEditChannel, startGetChannel, startRemoveChannel } from "../../actions/channel-action"
import { selectedChannelOne } from "../../actions/order-action"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { OperatorContext } from "../profile/operatorContext"
import { jwtDecode } from "jwt-decode"

const ChannelsList = () => {
  const [editId, setEditId] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [modal, setModal] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [formData, setFormData] = useState({
    channelPrice: "",
  })

  const dispatch = useDispatch()
  const channels = useSelector((state) => state.channel.data)

  // const {userState} = useContext(OperatorContext)
  // const role = userState.userDetails ? userState.userDetails.role : null;

  useEffect(()=>{
    if(localStorage.getItem('token')){
        const {role} = jwtDecode(localStorage.getItem("token"))
        console.log(role, "345")
        setUserRole(role)
    }
}, [localStorage.getItem('token')])

  useEffect(() => {
    dispatch(startGetChannel())
  }, [dispatch])

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure to delete?")
    if (confirm) {
      dispatch(startRemoveChannel(id))
      dispatch(startGetChannel())
    }
  }

  const handleEdit = (id) => {
    setEditId(id)
    const selectedChannel = channels.find((ele) => ele._id === id)
    setFormData({
      channelPrice: selectedChannel.channelPrice,
    })
    toggleModal()
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  const handleAdd = (id) => {
    const selectedChannel = channels.find((ele) => ele._id === id)
    const newChannels = {
      channelId: selectedChannel._id,
      channelPrice: selectedChannel.channelPrice,
      channelName: selectedChannel.channelName
    };
    setSelectedItems((previousItems) => [...previousItems, newChannels])
    dispatch(selectedChannelOne(newChannels))
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editId) {
      dispatch(startEditChannel(editId, formData))
    } else {
      dispatch(startAddChannel(formData))
    }
    setFormData({
      channelPrice: "",
    });
    dispatch(startGetChannel())
    toggleModal()
  };

  return (
    <div className="row g-3 d-flex-wrap" style={{ gap: "1rem", justifyContent: "center", alignItems: "center" }}>
      <h3 style={{ marginLeft: "400px", padding: "2px" }}>CHANNELS</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-1 mt-2">
        {channels.map((ele) => (
          <div key={ele.id} style={{ padding: "5px", width: "fit-content", height: "25rem" }}>
            <div className="card shadow-sm" style={{ width: "15rem", margin: "20px" }}>
              <img
                src={`http://localhost:3034/Images/${ele.image}`}
                alt="Channel"
                className="bd-placeholder-img card-img-top"
                style={{ objectFit: "cover", height: "45%" }}
              />
              <div className="card-body" style={{ height: "80%" }}>
                <h5 className="card-title">{ele.channelName}</h5>
                <p className="card-text">{ele.channelPrice}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">

                    {userRole === 'admin' && (
                      <>
                        <button
                      onClick={() => {
                        handleEdit(ele._id);
                      }}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(ele._id);
                      }}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Delete
                    </button>
                      </>
                    )}

                    {userRole === 'customer' && (
                      <>
                        <button
                      onClick={() => {
                        handleAdd(ele._id);
                      }}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Add to Cart
                    </button>
                      </>
                    )}
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{editId ? "Edit Channel" : "Add Channel"}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="channelPrice" className="form-label">
                Channel Price
              </label>
              <input
                type="text"
                id="channelPrice"
                value={formData.channelPrice}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <Button type="submit" color="primary">
              Save Changes
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ChannelsList

