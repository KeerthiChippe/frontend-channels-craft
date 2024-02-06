import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StartGetCustomer } from "../../actions/customer-action"
import { startGetPackage } from "../../actions/package-action"
import { startGetChannel } from "../../actions/channel-action"
import { startCreateOrder } from "../../actions/order-action"

const CreateOrder = ()=>{
    const dispatch = useDispatch()
    const [selectCustomer, setSelectCustomer] = useState('')
    const [selectPackage, setSelectPackage] = useState('')
    const [selectChannel, setSelectChannel] = useState('')
    const [orderDate, setOrderDate] = useState('')

    const customers = useSelector((state)=>{
        return state.customer.data
    })

    const packages = useSelector((state)=>{
        return state.package.data
    })

    const channels = useSelector((state)=>{
        return state.channel.data
    })

    useEffect(()=>{
        dispatch(StartGetCustomer())
        dispatch(startGetPackage())
        dispatch(startGetChannel())
    }, [dispatch])

    const handleChange = (e) => { 
        let customer = e.target.value
        setSelectCustomer(customer)
    }

    const handleOrder = ()=>{
      const selectedCustomer = customers.find(customer => customer._id === selectCustomer);
      const selectedPackage = packages.find(pkg => pkg._id === selectPackage);
      const selectedChannel = channels.find(channel => channel._id === selectChannel);
        const formData = {
            packages: [selectedPackage],
            channels: [selectedChannel],
            customers: selectedCustomer
        }
        console.log(formData, "llllll")
        dispatch(startCreateOrder(formData))
    }

    return(
        <div>
            <form>
            <label className="dropdown">Select Customer</label>
                <br />
                <select value={selectCustomer} onChange={handleChange}>
                <option value="" >Select a customer...</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer._id}>
                    {customer.customerName}
                  </option>
                ))}
              </select><br/>

              <label className="dropdown">Select Package</label>
                <br />
                <select value={selectPackage} onChange={(e)=>{
                    setSelectPackage(e.target.value)
                }}>
                <option value="" >Select a package...</option>
                {packages.map((ele) => (
                  <option key={ele.id} value={ele._id}>
                    {ele.packageName}-{ele.packagePrice}
                  </option>
                ))}
              </select><br/>

              <label className="dropdown">Select Channels</label>
                <br />
                <select value={selectChannel} onChange={(e)=>{
                    setSelectChannel(e.target.value)
                }}>
                <option value="" >Select a channel...</option>
                {channels.map((ele) => (
                  <option key={ele.id} value={ele._id}>
                    {ele.channelName}
                  </option>
                ))}
              </select><br/>

              {/* <label>Order Date</label><br />
              <input type='date' value={orderDate} onChange={(e)=>{
                setOrderDate(e.target.value)
              }} /><br /> */}

            </form>
            <button onClick={handleOrder}>order</button>
        </div>
    )
}

export default CreateOrder