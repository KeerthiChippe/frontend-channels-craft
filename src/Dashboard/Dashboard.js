import CustomersOrders from "./customersData"
import OrdersDashboard from "./OrdersDashboard"
import UsersDashboard from "./usersDashboard"
import { Row , Col} from "reactstrap"

const AdminDashboard = ()=>{
    return(
        <div>
            <Row className="row">
            <Col md={5}>
            <CustomersOrders />
            </Col>
            <Col md={7}  >
            <UsersDashboard />
            </Col>
            <OrdersDashboard />
            </Row>
        </div>
    )

}
export default AdminDashboard