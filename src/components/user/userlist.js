import { useEffect } from "react"
import { useDispatch , useSelector} from "react-redux"
import { startGetUser } from "../../actions/user-action"
import { Row ,Col ,Table} from "reactstrap"
const UserList = () =>{
    const dispatch =useDispatch()

    const user = useSelector((state) => {
        return state.user.data
    })
     
    useEffect(() => {
        dispatch(startGetUser())
    }, [dispatch])

  
    return (
        <div>
          <Row>
            <Col>
            <Table Striped bordered>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>User Mobile</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
            {user.filter((ele)=>{ 
                return ele.role=='operator'}).map((user) =>{
                   return <tr key = {user.id}><td>{user.username}</td> <td>{user.mobile}</td>  <td>{user.role}</td> </tr>
               })}
               </tbody>
                 </Table>
              
             
              
              <Table striped bordered>
                <thead>
                    <tr>
                    <td style={{ fontWeight: 'bold' }}>User Name</td>
                    <td style={{ fontWeight: 'bold' }}>Mobile</td>
                    <td style={{ fontWeight: 'bold' }}>Role</td>
                    </tr>
                </thead>
                <tbody>
               {user.filter((ele) =>{
                return ele.role == 'customer'}).map((user) =>{
                    return <tr key = {user.id}><td>{user.username}</td> <td>{user.mobile}</td> <td>{user.role}</td> </tr>
                })}
                </tbody>
                </Table>
                </Col>
                </Row>
        </div>
    )
}
export default UserList