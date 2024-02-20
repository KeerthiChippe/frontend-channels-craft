import { useEffect, useState } from "react"
import { useDispatch , useSelector} from "react-redux"
import { startGetUser } from "../../actions/user-action"
import { Row ,Col ,Table,Pagination, PaginationItem, PaginationLink} from "reactstrap"
import { Form, FormGroup, Input, Label } from "reactstrap";
import { jwtDecode } from "jwt-decode";

const UserList = () =>{
    const dispatch = useDispatch()

    const [searchOperator, setSearchOperator] = useState('')
    const [searchCustomer, setSearchCustomer] = useState('')
    const [sortOperator, setSortOperator] = useState('asc')
    const [sortCustomer, setSortCustomer] = useState('asc')
    const [role, setRole] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const user = useSelector((state) => {
        return state.user.data
    })
    // console.log(user, 'user check')
     
    
    useEffect(()=>{
        if(localStorage.getItem('token')){
            const {role} = jwtDecode(localStorage.getItem("token"))
            setRole(role)
        }
    }, [localStorage.getItem('token')])


    useEffect(() => {
        dispatch(startGetUser())
    }, [dispatch])

  
    const handleSearch = (e)=>{
        setSearchOperator(e.target.value)
    }

    const handleSearchCustomer = (e)=>{
        setSearchCustomer(e.target.value)
    }
    
    // const filteredUsers = user.filter((ele)=>{
    //     ele.username.toLowerCase().includes(search.toLowerCase())
    // })
    // console.log(filteredUsers, "filteredUsers")

    const filteredOperators = user.filter((user) =>
        user.role === 'operator' &&
        (user.username.toLowerCase().includes(searchOperator.toLowerCase()) || user.mobile.includes(searchOperator))
    );

    const filteredCustomers = user.filter((user)=>
        user.role === 'customer' &&
        (user.username.toLowerCase().includes(searchCustomer.toLowerCase()) || user.mobile.includes(searchCustomer))
    )

    const handleSortOperator = (e) =>{
        setSortOperator(e.target.value)
    }

    const handleSortCustomer = (e)=>{
        setSortCustomer(e.target.value)
    }

    const sortedOperators = [...filteredOperators].sort((a, b) => {
        if (sortOperator === 'asc') {
            return a.username.localeCompare(b.username);
        } else {
            return b.username.localeCompare(a.username);
        }
    });

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        if (sortCustomer === 'asc') {
            return a.username.localeCompare(b.username);
        } else {
            return b.username.localeCompare(a.username);
        }
    });

     // Pagination Logic
     const indexOfLastOperator = currentPage * itemsPerPage;
     const indexOfFirstOperator = indexOfLastOperator - itemsPerPage;
     const currentOperators = sortedOperators.slice(indexOfFirstOperator, indexOfLastOperator);
     const pageNumbersOperator = Math.ceil(sortedOperators.length / itemsPerPage);
 
     const indexOfLastCustomer = currentPage * itemsPerPage;
     const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
     const currentCustomers = sortedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
     const pageNumbersCustomer = Math.ceil(sortedCustomers.length / itemsPerPage);
 
     const paginate = (pageNumber) => setCurrentPage(pageNumber);
 

    return (
        <div>
          <Row>
            <Col>

            {role === 'admin' && (
                <div>
                {/* <input type='text' value={searchOperator} onChange={handleSearch} placeholder="Search by user name or mobile" /> */}
        {/* <Form>
                    <FormGroup>
                        <Label for="sort">Sort Order:</Label>
                        <Input type="select" name="sort" id="sortOrder" value={sortOperator} onChange={handleSortOperator}>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </Input>
                    </FormGroup>
                </Form> */}
        <Table Striped bordered>
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>User Mobile</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
        {currentOperators.filter((ele)=>{ 
            return ele.role === 'operator'}).map((user) =>{
               return <tr key = {user.id}><td>{user.username}</td> <td>{user.mobile}</td>  <td>{user.role}</td> </tr>
           })}
           </tbody>
             </Table>
             {/* <Pagination>
                   {Array.from({ length: pageNumbersOperator }, (_, i) => (
                         <PaginationItem key={i} active={i + 1 === currentPage}>
                             <PaginationLink onClick={() => paginate(i + 1)}>
                                 {i + 1}
                             </PaginationLink>
                         </PaginationItem>
                     ))}
                 </Pagination>        */}
            
                <input type='text' value={searchCustomer} onChange={handleSearchCustomer} placeholder="Search by user name or mobile" />
          {/* <Form>
                    <FormGroup>
                        <Label for="sort">Sort Order:</Label>
                        <Input type="select" name="sort" id="sortOrder" value={sortCustomer} onChange={handleSortCustomer}>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </Input>
                    </FormGroup>
                </Form> */}
          <Table striped bordered>
            <thead>
                <tr>
                <td style={{ fontWeight: 'bold' }}>User Name</td>
                <td style={{ fontWeight: 'bold' }}>Mobile</td>
                <td style={{ fontWeight: 'bold' }}>Role</td>
                </tr>
            </thead>
            <tbody>
           {currentCustomers.filter((ele) =>{
            return ele.role === 'customer'}).map((user) =>{
                return <tr key = {user.id}><td>{user.username}</td> <td>{user.mobile}</td> <td>{user.role}</td> </tr>
            })}
            </tbody>
            </Table>
            <Pagination>
                    {Array.from({ length: pageNumbersCustomer }, (_, i) => (
                        <PaginationItem key={i} active={i + 1 === currentPage}>
                            <PaginationLink onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </Pagination>
            </div>
            )}
                
        {role === 'operator' && (
            <div>
                <input type='text' value={searchCustomer} onChange={handleSearchCustomer} placeholder="Search by user name or mobile" />
          {/* <Form>
                    <FormGroup>
                        <Label for="sort">Sort Order:</Label>
                        <Input type="select" name="sort" id="sortOrder" value={sortCustomer} onChange={handleSortCustomer}>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </Input>
                    </FormGroup>
                </Form> */}
          <Table striped bordered>
            <thead>
                <tr>
                <td style={{ fontWeight: 'bold' }}>User Name</td>
                <td style={{ fontWeight: 'bold' }}>Mobile</td>
                <td style={{ fontWeight: 'bold' }}>Role</td>
                </tr>
            </thead>
            <tbody>
           {currentCustomers.filter((ele) =>{
            return ele.role === 'customer'}).map((user) =>{
                return <tr key = {user.id}><td>{user.username}</td> <td>{user.mobile}</td> <td>{user.role}</td> </tr>
            })}
            </tbody>
            </Table>
            <Pagination>
                    {Array.from({ length: pageNumbersCustomer }, (_, i) => (
                        <PaginationItem key={i} active={i + 1 === currentPage}>
                            <PaginationLink onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </Pagination>
            </div>
        )}
              
                </Col>
                </Row>
        </div>
    )
}
export default UserList

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { startGetUser } from "../../actions/user-action";
// import { Row, Col, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
// import { Form, FormGroup, Input, Label } from "reactstrap";

// const UserList = () => {
//     const dispatch = useDispatch();

//     const [searchOperator, setSearchOperator] = useState('');
//     const [searchCustomer, setSearchCustomer] = useState('');
//     const [sortOperator, setSortOperator] = useState('');
//     const [sortCustomer, setSortCustomer] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5);

//     const user = useSelector((state) => {
//         return state.user.data;
//     });
//     console.log(user, 'user check');

//     useEffect(() => {
//         dispatch(startGetUser());
//     }, [dispatch]);

//     const handleSearchOperator = (e) => {
//         setSearchOperator(e.target.value);
//     };

//     const handleSearchCustomer = (e) => {
//         setSearchCustomer(e.target.value);
//     };

//     const filteredOperators = user.filter((user) =>
//         user.role === 'operator' &&
//         (user.username.toLowerCase().includes(searchOperator.toLowerCase()) || user.mobile.includes(searchOperator))
//     );

//     const filteredCustomers = user.filter((user) =>
//         user.role === 'customer' &&
//         (user.username.toLowerCase().includes(searchCustomer.toLowerCase()) || user.mobile.includes(searchCustomer))
//     );

//     const handleSortOperator = (e) => {
//         setSortOperator(e.target.value);
//     };

//     const handleSortCustomer = (e) => {
//         setSortCustomer(e.target.value);
//     };

//     const sortedOperators = [...filteredOperators].sort((a, b) => {
//         if (sortOperator === 'asc') {
//             return a.username.localeCompare(b.username);
//         } else {
//             return b.username.localeCompare(a.username);
//         }
//     });

//     const sortedCustomers = [...filteredCustomers].sort((a, b) => {
//         if (sortCustomer === 'asc') {
//             return a.username.localeCompare(b.username);
//         } else {
//             return b.username.localeCompare(a.username);
//         }
//     });

//     // Pagination Logic
//     const indexOfLastOperator = currentPage * itemsPerPage;
//     const indexOfFirstOperator = indexOfLastOperator - itemsPerPage;
//     const currentOperators = sortedOperators.slice(indexOfFirstOperator, indexOfLastOperator);
//     const pageNumbersOperator = Math.ceil(sortedOperators.length / itemsPerPage);

//     const indexOfLastCustomer = currentPage * itemsPerPage;
//     const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
//     const currentCustomers = sortedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
//     const pageNumbersCustomer = Math.ceil(sortedCustomers.length / itemsPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div>
//             <Row>
//                 <Col>
//                     <input type='text' value={searchOperator} onChange={handleSearchOperator} placeholder="Search operators by user name or mobile" />
//                     <Form>
//                         <FormGroup>
//                             <Label for="sortOperator">Sort Order:</Label>
//                             <Input type="select" name="sortOperator" id="sortOrderOperator" value={sortOperator} onChange={handleSortOperator}>
//                                 <option value="asc">A-Z</option>
//                                 <option value="desc">Z-A</option>
//                             </Input>
//                         </FormGroup>
//                     </Form>
//                     <Table striped bordered>
//                         <thead>
//                             <tr>
//                                 <th>User Name</th>
//                                 <th>User Mobile</th>
//                                 <th>Role</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentOperators.map((user) => (
//                                 <tr key={user.id}>
//                                     <td>{user.username}</td>
//                                     <td>{user.mobile}</td>
//                                     <td>{user.role}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                     <Pagination>
//                         {Array.from({ length: pageNumbersOperator }, (_, i) => (
//                             <PaginationItem key={i} active={i + 1 === currentPage}>
//                                 <PaginationLink onClick={() => paginate(i + 1)}>
//                                     {i + 1}
//                                 </PaginationLink>
//                             </PaginationItem>
//                         ))}
//                     </Pagination>
//                 </Col>
//                 <Col>
//                     <input type='text' value={searchCustomer} onChange={handleSearchCustomer} placeholder="Search customers by user name or mobile" />
//                     <Form>
//                         <FormGroup>
//                             <Label for="sortCustomer">Sort Order:</Label>
//                             <Input type="select" name="sortCustomer" id="sortOrderCustomer" value={sortCustomer} onChange={handleSortCustomer}>
//                                 <option value="asc">A-Z</option>
//                                 <option value="desc">Z-A</option>
//                             </Input>
//                         </FormGroup>
//                     </Form>
//                     <Table striped bordered>
//                         <thead>
//                             <tr>
//                                 <th>User Name</th>
//                                 <th>User Mobile</th>
//                                 <th>Role</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentCustomers.map((user) => (
//                                 <tr key={user.id}>
//                                     <td>{user.username}</td>
//                                     <td>{user.mobile}</td>
//                                     <td>{user.role}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                     <Pagination>
//                         {Array.from({ length: pageNumbersCustomer }, (_, i) => (
//                             <PaginationItem key={i} active={i + 1 === currentPage}>
//                                 <PaginationLink onClick={() => paginate(i + 1)}>
//                                     {i + 1}
//                                 </PaginationLink>
//                             </PaginationItem>
//                         ))}
//                     </Pagination>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default UserList;
