import { useState, useEffect } from "react"
import axios from "../config/axios"
import { useNavigate } from "react-router-dom"

export default function Success(){
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(()=>{
        (async()=>{
            try{
                const stripId = localStorage.getItem("stripId")
                console.log(stripId, "stripId")
                const {data} = await axios.put(`/api/payment/${stripId}`, {}, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                setIsSuccess(!isSuccess)
                localStorage.removeItem("stripId")

                setTimeout(()=>{
                    navigate('/customerProfile', {state: data})
                }, 8000)
            }catch(e){
                console.log(e)
            }

        })()

    }, [])
    return(
        <div>
            {isSuccess && (
                <>
                    <div className="d-flex justify-content-center mt-4">
                <h3>Payment is successfull</h3>
                {/* <img 
                    src={process.env.PUBLIC_URL + "/Images/status/payment-success.png"}
                    alt="success"
                    style={{width: "25%",}}
                /> */}
                </div>
                </>
            )}
        </div>
    )
}