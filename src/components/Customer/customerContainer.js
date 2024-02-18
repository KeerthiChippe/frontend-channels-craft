import AddCustomer from './AddCustomer'
import CustomerList from './listCustomers'
import { useSelector } from 'react-redux'
import { Row ,Col} from 'reactstrap'
import './customer.css'

const CustomerContainer = ({addCustomer}) =>{
const Customer = useSelector((state)=>{
            return state.customer
})
    return(
        <div className=" d-flex justify-content-center adding">
       <Row>
         <Col md={5}>
        <AddCustomer addCustomer={addCustomer}/>
         </Col>
       
       <Col md={7}>
        <CustomerList/>
        </Col>
        </Row>
        </div>
    )
}
export default CustomerContainer