import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "../../config/axios"

const OrderDetails = ()=>{
    const location = useLocation()

    const cart = useSelector((state) => {
        return state.order
    })
    console.log(cart, 'cart items')

    console.log(location.state[0], "location")
    
    const handlePay = async ()=>{
        const amount = location.state[0].totalPrice
        const orderId = location.state[0]._id
        try{
            const {data} = await axios.post('/api/payment', {amount, orderId}, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            localStorage.setItem('stripId', data.id)
            window.location = data.url
        }catch(e){
            console.log(e)
        }

    }
    console.log(location.state, "location")

    return (
        <div>
            <h1> Order Details</h1>

            <h3>Packages</h3>
            <p>No.of packages-{cart.packages.length}</p>
            <ul>
                {cart.packages.map((item, index) => (
                    
                    <li key={index} >
                        <div>
                            Name of the package- {item.packageName}<br />
                            Price- {item.packagePrice} <br />
                            channels- {item.selectedChannels}
                        </div>

                    </li>
                ))}
            </ul>

            <h3>Channels</h3>
            <p>No.of Channels-{cart.channels.length}</p>
            <ul >
                {cart.channels.map((item, index) => (
                    <li key={index} >
                        <div>
                            Name of the channel- {item.channelName} <br />
                            Price- {item.channelPrice}
                        </div>

                    </li>
                ))}
            </ul>

            <h3>Total Price - {location.state[0]?.totalPrice}</h3>
            <button onClick={handlePay}>pay</button>
        </div>
    )
}
export default OrderDetails