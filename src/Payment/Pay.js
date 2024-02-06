import { useState } from "react"
import axios from "../config/axios"

const Payment = ()=>{
    const [amount, setAmount] = useState('')

    const handlePay = async ()=>{
        console.log(amount, '0000')
        try{
            const {data} = await axios.post('/api/payment', {amount})
            // localStorage.setItem('stripId', data.id)
            window.location = data.url
        }catch(e){
            console.log(e)
        }
      
    }
    
    return(
        <div>
            <input type='text' value={amount} onChange={(e)=>{
                setAmount(e.target.value)
            }} />
            <button onClick={handlePay}>pay</button>
        </div>
    )
}
export default Payment