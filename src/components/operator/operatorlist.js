// // import addOperator from "./Addoperator"
// import { startGetOperator, StartRemoveOperator, startEditOperator } from "../../actions/operator-action"
// import { useDispatch, useSelector } from "react-redux"
// import { useEffect, useState,useContext } from "react"
// import { Row, Col, Table } from 'reactstrap'
// import './operatorlist.css'
// import { startUpdateUser } from "../../actions/user-action"
// import { OperatorContext } from "../profile/operatorContext"

// const OperatorList = (props) => {
//     const {userState} = useContext(OperatorContext)

//     const [search, setSearch] = useState('')
//     const [sort, setSort] = useState('')
//     const [formData, setFormData] = useState({
//         mobile: userState.userDetails.mobile,
//     })

//     const userId = userState.userDetails._id

//     // const [editId, setEditId] = useState(false)
//      const [mobile, setMobile] = useState('')
//     const dispatch = useDispatch()
//     // const naviagte = useNavigate()

//     const operator = useSelector((state) => {
//         return state.operator.data
//     })

//     useEffect(() => {
//         dispatch(startGetOperator())
//     }, [dispatch])

//     const handleDelete = (id) => {
//         const confirm = window.confirm('Are you sure??')
//         if (confirm) {
//             dispatch(StartRemoveOperator(id))
//         }
//     }

//     // const handleEdit = (id) => {
//     //     // console.log(id, formData)
//     //     setEditId(id)
//     //     setMobile('')
//     // }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const operatorData = {
//             mobile: mobile
//         }
//         await dispatch(startEditOperator(operatorData))
//         dispatch(startUpdateUser(userId, operatorData))
//         setFormData({
//             ...formData
//         })
//     }

//     const handleSearch = (e)=>{
//         setSearch(e.target.value)
//     }

//     return (
//         <div>
//             <Row>
//                 <Col>
//                 <input type='text' value={search} onChange={handleSearch} placeholder="Search by operator name" />
//                     <Table striped bordered>
//                         <thead>
//                             <tr>
//                                 <th>Operator Name</th>
//                                 <th>Mobile</th>
//                                 <th>Delete</th>
//                             </tr>
//                         </thead>
//                         <tbody>

//                             {operator.map((operator) => {
//                                 return <tr key={operator.id} ><td>{operator.operatorName}</td><td> {operator.mobile}</td>
        

//                                 <td><button onClick={() => {
//                                         console.log(operator._id)
//                                         handleDelete(operator._id)
//                                     }} >Delete</button></td>
//                                 </tr>
//                             })}


//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
//             {/* {editId && (
//                 <form onSubmit={handleSubmit}>
//                     <label>mobile</label>
//                     <input type='text' value={mobile} onChange={(e) => {
//                         setMobile(e.target.value)
//                     }} /> <br />

//                     <input type='submit' />
//                 </form>
//             )} */}


//         </div>


//     )
// }
// export default OperatorList

// import { useEffect, useState } from "react";
// import { Row, Col, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import { useDispatch, useSelector } from "react-redux";
// import { startGetOperator, StartRemoveOperator } from "../../actions/operator-action";
// import { Form, FormGroup, Input, Label } from "reactstrap";

// const OperatorList = () => {
//     const [search, setSearch] = useState('');
//     const [sort, setSort] = useState('asc'); // Default sort order
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);

//     const dispatch = useDispatch();
//     const operator = useSelector((state) => state.operator.data);

//     useEffect(() => {
//         dispatch(startGetOperator());
//     }, [dispatch]);

//     const handleDelete = (id) => {
//         const confirm = window.confirm('Are you sure??');
//         if (confirm) {
//             dispatch(StartRemoveOperator(id));
//         }
//     };

//     const handleSearch = (e) => {
//         setSearch(e.target.value);
//     };

//     const handleSort = (e) => {
//         setSort(e.target.value);
//     };

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const filteredOperators = operator.filter((operator) =>
//         operator.operatorName.toLowerCase().includes(search.toLowerCase())
//     );
//     const sortedOperators = [...filteredOperators].sort((a, b) => {
//         if (sort === 'asc') {
//             return a.operatorName.localeCompare(b.operatorName);
//         } else {
//             return b.operatorName.localeCompare(a.operatorName);
//         }
//     });
//     const currentOperators = sortedOperators.slice(indexOfFirstItem, indexOfLastItem);

//     return (
//         <div>
//             <Row>
//                 <Col>
//                     <input type='text' value={search} onChange={handleSearch} placeholder="Search by operator name" />
//                     <Form>
//                         <FormGroup>
//                             <Label for="sort">Sort Order:</Label>
//                             <Input type="select" name="sort" id="sortOrder" value={sort} onChange={handleSort}>
//                                 <option value="asc">A-Z</option>
//                                 <option value="desc">Z-A</option>
//                             </Input>
//                         </FormGroup>
//                     </Form>
//                     <Table striped bordered>
//                         <thead>
//                             <tr>
//                                 <th>Operator Name</th>
//                                 <th>Mobile</th>
//                                 <th>Delete</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentOperators.map((operator) => (
//                                 <tr key={operator.id}>
//                                     <td>{operator.operatorName}</td>
//                                     <td>{operator.mobile}</td>
//                                     <td>
//                                         <button onClick={() => handleDelete(operator._id)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                     <Pagination aria-label="Page navigation example">
//                         <PaginationItem disabled={currentPage <= 1}>
//                             <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
//                         </PaginationItem>
//                         <PaginationItem disabled={currentPage >= Math.ceil(sortedOperators.length / itemsPerPage)}>
//                             <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
//                         </PaginationItem>
//                     </Pagination>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default OperatorList;
import { useEffect, useState } from "react";
import { Row, Col, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap'; // Import Pagination components from reactstrap
import { useDispatch, useSelector } from "react-redux";
import { startGetOperator, StartRemoveOperator } from "../../actions/operator-action";
import { Form, FormGroup, Input, Label } from "reactstrap";

const OperatorList = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('asc'); // Default sort order
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page state

    const dispatch = useDispatch();
    const operator = useSelector((state) => state.operator.data);

    useEffect(() => {
        dispatch(startGetOperator());
    }, [dispatch]);

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure??');
        if (confirm) {
            dispatch(StartRemoveOperator(id));
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset current page when search changes
    };

    const filteredOperators = operator.filter((operator) =>
        operator.operatorName.toLowerCase().includes(search.toLowerCase())
    );

    const handleSort = (e) => {
        setSort(e.target.value);
    };

    const sortedOperators = [...filteredOperators].sort((a, b) => {
        if (sort === 'asc') {
            return a.operatorName.localeCompare(b.operatorName);
        } else {
            return b.operatorName.localeCompare(a.operatorName);
        }
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOperators = sortedOperators.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedOperators.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Row>
                <Col>
                    <input type='text' value={search} onChange={handleSearch} placeholder="Search by operator name" />
                    <Form>
                        <FormGroup>
                            <Label for="sort">Sort Order:</Label>
                            <Input type="select" name="sort" id="sortOrder" value={sort} onChange={handleSort}>
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </Input>
                        </FormGroup>
                    </Form>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Operator Name</th>
                                <th>Mobile</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOperators.map((operator) => (
                                <tr key={operator.id}>
                                    <td>{operator.operatorName}</td>
                                    <td>{operator.mobile}</td>
                                    <td>
                                        <button onClick={() => handleDelete(operator._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index} active={index + 1 === currentPage}>
                                <PaginationLink onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                    </Pagination>
                </Col>
            </Row>
        </div>
    );
};

export default OperatorList;
