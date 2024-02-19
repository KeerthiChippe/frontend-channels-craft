import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';; // Assuming you're using axios for making HTTP requests

const ExpiredOrders = () => {
    const [expiredOrders, setExpiredOrders] = useState([]);
    
    useEffect(() => {
        const fetchExpiredOrders = async () => {
            try {
                // Make a GET request to fetch the expired orders
                const response = await axios.get('/api/payment/expiredOrders', {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
                // Update the state with the fetched expired orders
                setExpiredOrders(response.data);
                console.log(response.data, "exp")
            } catch (error) {
                console.error('Error fetching expired orders:', error);
            }
        };
        
        fetchExpiredOrders(); // Call the function to fetch expired orders when the component mounts
    }, []);

    return (
        <div>
            <h2>Expired Orders</h2>
            <ul>
                {expiredOrders.map(order => (
                    <li key={order._id}>
                        {/* Render order details here */}
                        <p>Order ID: {order.orderId}</p>
                        <p>Amount: {order.amount}</p>
                        {/* Add more details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpiredOrders;
