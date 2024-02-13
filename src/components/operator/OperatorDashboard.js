import { useState } from 'react';
import axios from '../../config/axios';

const OperatorDashboard = () => {
    const [subscriptionActivated, setSubscriptionActivated] = useState(false);
    const orderId = "65c9ea92b7a9cf8dba82bb0c"

    const handleSubscriptionActivation = async (orderId) => {
        try {
            await axios.post(`/api/orders/${orderId}/activate`,null, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            setSubscriptionActivated(true);
        } catch (error) {
            console.error('Error activating subscription:', error);
        }
    };

    return (
        <div>
            <h2>Operator Dashboard</h2>
            <div>
                <input
                    type="checkbox"
                    checked={subscriptionActivated}
                    onChange={() => handleSubscriptionActivation(orderId)}
                />
                <label>Activate Subscription</label>
            </div>
        </div>
    );
};

export default OperatorDashboard;
