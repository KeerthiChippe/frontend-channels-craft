import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { startRemovePackage, startAddPackage, startEditPackage, startGetPackage } from "../../actions/package-action";
import { deletePackageOne, selectedPackageOne } from "../../actions/order-action";
import { OperatorContext } from "../profile/operatorContext";
import { jwtDecode } from "jwt-decode";

const ListPackages = () => {
  const [editId, setEditId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [userRole, setUserRole] = useState('')

  useEffect(()=>{
    if(localStorage.getItem('token')){
        const {role} = jwtDecode(localStorage.getItem("token"))
        console.log(role, "345")
        setUserRole(role)
    }
}, [localStorage.getItem('token')])

  // const { userState } = useContext(OperatorContext);
  const dispatch = useDispatch();

  // const role = userState.userDetails ? userState.userDetails.role : null;

  const packages = useSelector((state) => {
    return state.package.data.filter((ele) => ele.isDeleted === false);
  });

  useEffect(() => {
    dispatch(startGetPackage());
  }, [dispatch]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      dispatch(startRemovePackage(id));
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    toggleModal();
  };

  const [formData, setFormData] = useState({
    packagePrice: "",
  });

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

  return (
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
                <p className="card-text">{ele.packagePrice}</p>
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
    </div>
  );
};

export default ListPackages;




