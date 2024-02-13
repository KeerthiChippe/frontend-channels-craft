// import addOperator from "./Addoperator"
import { startGetOperator, StartRemoveOperator, startEditOperator } from "../../actions/operator-action"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState,useContext } from "react"
import { Row, Col, Table } from 'reactstrap'
import './operatorlist.css'
import { startUpdateUser } from "../../actions/user-action"
import { OperatorContext } from "../profile/operatorContext"

const OperatorList = (props) => {
    const {userState} = useContext(OperatorContext)

    const [formData, setFormData] = useState({
        mobile: userState.userDetails.mobile,
    })

    const userId = userState.userDetails._id

    // const [editId, setEditId] = useState(false)
     const [mobile, setMobile] = useState('')
    const dispatch = useDispatch()
    // const naviagte = useNavigate()

    const operator = useSelector((state) => {
        return state.operator.data
    })

    useEffect(() => {
        dispatch(startGetOperator())
    }, [dispatch])

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure??')
        if (confirm) {
            dispatch(StartRemoveOperator(id))
        }
    }

    // const handleEdit = (id) => {
    //     // console.log(id, formData)
    //     setEditId(id)
    //     setMobile('')
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const operatorData = {
            mobile: mobile
        }
        await dispatch(startEditOperator(operatorData))
        dispatch(startUpdateUser(userId, operatorData))
        setFormData({
            ...formData
        })
    }

    return (
        <div>
            <Row>
                <Col>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Operator Name</th>
                                <th>Mobile</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {operator.map((operator) => {
                                return <tr key={operator.id} ><td>{operator.operatorName}</td><td> {operator.mobile}</td>
        

                                <td><button onClick={() => {
                                        console.log(operator._id)
                                        handleDelete(operator._id)
                                    }} >Delete</button></td>
                                </tr>
                            })}


                        </tbody>
                    </Table>
                </Col>
            </Row>
            {/* {editId && (
                <form onSubmit={handleSubmit}>
                    <label>mobile</label>
                    <input type='text' value={mobile} onChange={(e) => {
                        setMobile(e.target.value)
                    }} /> <br />

                    <input type='submit' />
                </form>
            )} */}


        </div>


    )
}
export default OperatorList
