import { StartGetCustomer  , startEditCustomer ,startRemoveCustomer} from "../../actions/customer-action"
import { useDispatch , useSelector } from "react-redux"
import { useContext, useEffect ,useState } from "react"
import { startUpdateUser } from "../../actions/user-action"
import { OperatorContext } from "../profile/operatorContext"
import { Row ,Col ,Table} from "reactstrap"
import './customerlist.css'

const CustomerList =(props) =>{
    const {userState} = useContext(OperatorContext) 

    // const [editId ,setEditId] =useState(false)
    const [mobile ,setMobile] =useState('')
    const dispatch = useDispatch()

    
    const userId = userState.userDetails._id

    const customer = useSelector((state) =>{
        return state.customer.data
    })

    useEffect (() =>{
        dispatch(StartGetCustomer())
        // dispatch(startEditCustomer())
    } ,[dispatch])

    const handleDelete = (id) =>{
        const confirm = window.confirm('Are you sure ??')
        if(confirm) {
            dispatch (startRemoveCustomer(id))
        }
    }

    // const handleEdit = (id) =>{
    //     setEditId(id)
    //     setMobile('')
    // }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            mobile :mobile
        }
        // dispatch(startEditCustomer(editId ,formData))
        dispatch(startUpdateUser(userId, formData))
        // setEditId('')
    }

    return(
        <div>
            <Table striped bordered className="customer" style={{margin:"0px" ,padding:"0px" , marginTop:"100px"}}>
            <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Mobile</th>
                                <th>box Number</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
            {customer.map ((customer) =>{
                return <tr key ={customer.id}> <td>{customer.customerName}</td>  <td>{customer.mobile}</td>  <td>{customer.boxNumber}</td>
                {/* <button onClick ={() =>{
                    handleEdit(customer._id)
                }}>edit</button>  */}
                <td>
                <button onClick ={() =>{
                    handleDelete(customer._id)
                }}>Delete</button> </td>  </tr>
                
             } )}
            
             </tbody>
             </Table>
                {/* {editId && (
                    <form onSubmit ={handleSubmit}>
                        <label>Mobile</label>
                        <input type ='text' value ={mobile} onChange={(e) =>{
                            setMobile(e.target.value)
                        }}/>

                        <input type ='submit' /> 
                         </form>
                )}  */}
             </div>    
    
    )
}
export default CustomerList