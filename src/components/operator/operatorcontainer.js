import { useSelector } from "react-redux";
// import AddOperator from "./AddOperator";
import Operator from "./Operator";
import OperatorList from "./operatorlist";
import { Row , Col} from "reactstrap"
import './operator.css'

const OperatorContainer =() =>{
    const operator = useSelector((state)=>{
        return state.operator
    })
    return(
        <div>
             <Row className="row">
            <Col md={5}>
            <Operator />
            </Col>
            <Col md={7}  >
            <OperatorList />
            </Col>
            </Row>
        </div>
        
    )
}
export default OperatorContainer