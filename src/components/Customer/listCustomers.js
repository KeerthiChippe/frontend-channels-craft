import { StartGetCustomer  , startEditCustomer ,startRemoveCustomer} from "../../actions/customer-action"
import { useDispatch , useSelector } from "react-redux"
import { useContext, useEffect ,useState } from "react"
import { OperatorContext } from "../profile/operatorContext"
import { Row,Table} from "reactstrap"
import './customerlist.css'

const CustomerList =(props) =>{
    const {userState} = useContext(OperatorContext) 

    const [mobile ,setMobile] =useState('')
    const dispatch = useDispatch()

    
    const userId = userState.userDetails._id

    const customer = useSelector((state) =>{
        return state.customer.data
    })
    console.log(customer, 'aaa')
    

    useEffect (() =>{
        dispatch(StartGetCustomer())
    } ,[dispatch])

    const handleDelete = (id, operatorId) =>{
        const confirm = window.confirm('Are you sure ??')
        if(confirm) {
            dispatch(startRemoveCustomer(id, operatorId))
        }
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
                return <tr key ={customer._id}> <td>{customer.customerName}</td>  <td>{customer.mobile}</td>  <td>{customer.boxNumber}</td>
                
                <td>
                <button onClick ={() =>{
                    handleDelete(customer._id, customer.operatorId)
                }}>Delete</button> </td>  </tr>
                
             } )}
            
             </tbody>
             </Table>
             </div>    
    
    )
}
export default CustomerList