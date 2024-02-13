import { useSelector, useDispatch } from "react-redux"
import { startCreateOrder } from "../../actions/order-action"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => {
        return state
    })
    // console.log(cart.order.channels, "ii")

    const { packages: pack, channels } = useSelector((state) => {
        return state.order || {};
    });

     // Calculate total price for packages
     const calculateTotalPriceForPackages = () => {
        return pack.reduce((total, item) => total + item.packagePrice, 0);
    };

    // Calculate total price for channels
    const calculateTotalPriceForChannels = () => {
        return channels.reduce((total, item) => total + item.channelPrice, 0);
    };

    // Calculate total price for packages and channels combined
    const calculateTotalPriceForBoth = () => {
        return calculateTotalPriceForPackages() + calculateTotalPriceForChannels();
    };

    const handleOrder = () => {
        const formData = {
            packages: pack,
            channels: channels,
            // orderDate: new Date(),
        };
        dispatch(startCreateOrder(formData));
    };

    useEffect(()=>{
        if(cart.order.cart.length > 0){
            // const price = calculateTotalPriceForPackages()
            navigate('/orderpay', {state: cart.order.cart})
            // console.log(cart.order.cart, "cart")
        }
    }, [cart.order.cart])

    // console.log(cart.order.packages, "tttt")


    return (
        <div>
            <h2 className="mt-3">Cart</h2>

            <h3>Packages</h3>
            <ul className="list-group" style={{ height: "500px", overflowY: "auto" }}>
                {cart.order.packages.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            {item.packageName} - {item.packagePrice} - {item.selectedChannels}
                        </div>

                    </li>
                ))}
            </ul>

            <h3>Channels</h3>
            <ul className="list-group" style={{ height: "500px", overflowY: "auto" }}>
                {cart.order.channels.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            {item.channelName} - {item.channelPrice}
                        </div>

                    </li>
                ))}
            </ul>
            
            <h3>Total Price for Packages: {calculateTotalPriceForPackages()}</h3>
            <h3>Total Price for Channels: {calculateTotalPriceForChannels()}</h3>
            <h3>Total Price for Both: {calculateTotalPriceForBoth()}</h3>
            
            <button
                onClick={() => {
                    handleOrder();
                }}
                className="btn btn-success mt-3"
            >
                Order
            </button>
            
        </div>
    )

}
export default Cart