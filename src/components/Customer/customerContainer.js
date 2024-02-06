import AddCustomer from './AddCustomer'
import CustomerList from './listCustomers'
import { useSelector } from 'react-redux'
import { Row ,Col} from 'reactstrap'
const CustomerContainer = () =>{
const Customer = useSelector((state)=>{
            return state.customer
})
    return(
        <div className=" d-flex justify-content-center">
       <Row>
         <Col md={5}>
        <AddCustomer />
         </Col>
       
       <Col md={7}>
        <CustomerList/>
        </Col>
        </Row>
        </div>
    )
}
export default CustomerContainer