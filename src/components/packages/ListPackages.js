import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { startRemovePackage, startAddPackage, startEditPackage, startGetPackage } from "../../actions/package-action";
import { deletePackageOne, selectedPackageOne } from "../../actions/order-action";
import { OperatorContext } from "../profile/operatorContext";
import { jwtDecode } from "jwt-decode";
import { FadeLoader, ClipLoader } from "react-spinners";


const ListPackages = () => {
  const [editId, setEditId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [userRole, setUserRole] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('')
  const [viewModal, setViewModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    packagePrice: "",
  });
 
  useEffect(()=>{
    if(localStorage.getItem('token')){
        const {role} = jwtDecode(localStorage.getItem("token"))
        setUserRole(role)
    }
}, [localStorage.getItem('token')])

  const dispatch = useDispatch();

  const packages = useSelector((state) => {
    return state.package.data.filter((ele) => ele.isDeleted === false);
  });

  useEffect(() => {
    setIsLoading(true)
    dispatch(startGetPackage());
    setIsLoading(false)
  }, [dispatch]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleViewModal = () => {
    setViewModal(!viewModal);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      dispatch(startRemovePackage(id));
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    const selectedPackage = packages.find((ele) => ele._id === id)
    setFormData({
      packagePrice: selectedPackage.packagePrice,
    })
    setModal(true)
    // toggleViewModal(false);
  };

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAdd = (id) => {
    const selectedPackage = packages.find((ele) => ele._id === id);
    console.log(selectedPackage, "ccc")
    const newPackages = {
      packageId: selectedPackage._id,
      packagePrice: selectedPackage.packagePrice,
      packageName: selectedPackage.packageName,
      selectedChannels: selectedPackage.selectedChannels
    };
    dispatch(selectedPackageOne(newPackages));
    // setSelectedItems((previousItems) => [...previousItems, newPackages]);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(startEditPackage(editId, formData));
      toggleModal();
    } else {
      dispatch(startAddPackage(formData));
    }
    setFormData({
      packagePrice: "",
    });
    dispatch(startGetPackage());
  };

  const handleRemove = (id) => {
    const removeItem = selectedItems.find((ele) => ele._id === id);
    dispatch(deletePackageOne(removeItem));
  };

  const handleView = (id)=>{
    const selectedPkg = packages.find((pkg) => pkg._id === id);
    setSelectedPackage(selectedPkg); // Step 2: Set selected package details
    setViewModal(true); // Open view modal
    // toggleModal(false); // Close edit modal if it's open

  }
  
  return (
    
    <div>
      
    {!isLoading ? (
      <div className="row g-3 d-flex-wrap" style={{ gap: "1rem", justifyContent: "center", alignItems: "center" }}>
      <h3 style={{ marginLeft: "400px", padding: "2px" }}>PACKAGES</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-1 mt-2">
        {packages.map((ele) => (
          <div key={ele.id} style={{ padding: "5px", width: "fit-content", height: "25rem" }}>
            <div className="card shadow-sm" style={{ width: "15rem", margin: "20px" }}>
              <img
                src={`http://localhost:3034/Images/${ele.image}`}
                alt="Package"
                className="bd-placeholder-img card-img-top"
                style={{ objectFit: "cover", height: "45%" }}
              />
              <div className="card-body" style={{ height: "80%" }}>
                <h5 className="card-title">{ele.packageName}</h5>
                <p className="card-text">Price - {ele.packagePrice}</p>
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
                      style={{ marginRight: '20px' }}
                    >
                      Add to Cart
                    </button>
                      </>
                    )}

                    <button onClick={()=>{
                      handleView(ele._id)
                    }} style={{ marginRight: '50px' }} >
                      view
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

  <Modal isOpen={modal} toggle={toggleModal}>
  <ModalHeader toggle={toggleModal}>Edit Package</ModalHeader>
  <ModalBody>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="packagePrice" className="form-label">
          Price
        </label>
        <input
          type="number"
          id="packagePrice"
          value={formData.packagePrice}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <Button type="submit" color="primary">
        Save
      </Button>
    </form>
  </ModalBody>
</Modal>

      <Modal isOpen={viewModal} toggle={toggleViewModal}>
        <ModalHeader toggle={toggleViewModal}>Channels</ModalHeader>
        <ModalBody>
          {selectedPackage && (
            <div>
              {/* <ul>
              
                {selectedPackage.selectedChannels.map((channel, index) => (
                  <li key={index}><img src={`http://localhost:3034/Images/${channel.image}`} alt={channel.channelName} style={{ maxHeight: "50px" }} />{channel.channelName}</li>
                ))}
              </ul> */}
              <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* Render selected channels */}
          {selectedPackage.selectedChannels.map((channel, index) => (
            <div key={index} style={{ margin: "5px" }}>
              <img src={`http://localhost:3034/Images/${channel.image}`} alt={channel.channelName} style={{ maxHeight: "50px" }} />
              <div>{channel.channelName}</div>
            </div>
          ))}
        </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
     ) : (
       <div style={{ height: "59vh" }} className="d-flex justify-content-center align-items-center">
                <ClipLoader
                    color={"#7aa9ab"}
                    isLoading={isLoading}
                    size={30}
                />
            </div>
    )}
    </div>
  );
};

export default ListPackages;




