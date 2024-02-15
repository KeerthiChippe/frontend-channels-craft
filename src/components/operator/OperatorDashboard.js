import { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { useSelector, useDispatch } from 'react-redux';


const OperatorDashboard = () => {
    const dispatch = useDispatch()
    const [paymentDetails, setPaymentDetails] = useState(null)
    const [activateSubscription, setActivateSubscription] = useState(false)

    useEffect(()=>{
        const fetchPaymentDetails = async ()=>{
            try{
                const response = await axios.get('/api/payment/subscribers', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log(response.data, "payment details")
                console.log("shdjhdk")
                setPaymentDetails(response.data)
                
            }catch(e){
                console.log(e)
            }
        }
        fetchPaymentDetails()
    }, [])

    const handleActivate = async (paymentId)=>{
        try{
            const response = await axios.put(`/api/payment/${paymentId}/activate`, null, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            setPaymentDetails(paymentDetails.map(payment => {
                if (payment._id === paymentId) {
                    return { ...payment, activate: true };
                }
                return payment;
            }));
        }catch(e){
            console.log(e)
        }
    }
   

    return(
        <div>
            <h3>Payment Details</h3>
            <ul>
            {paymentDetails && paymentDetails.map((payment, index) => (
                    <li key={index}>
                        <h4>Customer Name: {payment.customerId.customerName}</h4>
                        <p>Amount: {payment.amount}</p>
                        <p>Payment Status: {payment.status}</p>
                       
                        <ul>Packages {payment.orderId?.packages?.map((ele)=>{
                            return <li key={ele._id}>{ele.packageId}</li>
                        })}</ul>
                        {!payment.activate && (
                            <button onClick={()=>{
                                handleActivate(payment._id)
                            }}>Activate subscription</button>
                        )}
                       
                    </li>
                ))}

            </ul>
            
        </div>
    )
};

export default OperatorDashboard;
