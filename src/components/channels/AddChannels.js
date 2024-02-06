import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startAddChannel } from "../../actions/channel-action";
import { startGetPackage } from "../../actions/package-action";
import {Row,Col} from 'reactstrap'



const AddChannel = ()=>{
    const dispatch = useDispatch()
    const [channelName, setChannelName] = useState('')
    const [channelPrice, setChannelPrice] = useState('')
    const [isHD, setIsHD] = useState(false)
    const [channelNumber, setChannelNumber] = useState('')
    const [language, setLanguage] = useState('')
    const [image, setImage] = useState(null)
    const [formErrors, setFormErrors] = useState([])
   
    // const [selectedPackage, setSelectedPackage] = useState(false)

    const errors = {}

    function runValidations(){
        if(channelName.trim().length === 0){
            errors.channelName = 'channel name is required'
        }
        if(channelPrice.trim().length === 0){
            errors.channelPrice = 'channel price is required'
        }
        if(channelNumber.trim().length === 0){
            errors.channelNumber = 'channel number is required'
        }
        if(language.trim().length === 0){
            errors.language = 'language is required'
        }
    }

    const packages = useSelector((state)=>{
        return state.package.data
    })

    useEffect(()=>{
        dispatch(startGetPackage())
    }, [dispatch])

    const serverErrors = useSelector((state)=>{
        return state.channel.serverErrors
    })


    const handleSubmit = (e)=>{
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length === 0){
            const formData = new FormData()
               formData.append("channelName",channelName) 
               formData.append("channelPrice",channelPrice)
               formData.append("channelNumber",channelNumber)
               formData.append(" channelNumber", channelNumber)
               formData.append("language", language)
               formData.append(" isHD",  isHD)
               formData.append("file", image)

            dispatch(startAddChannel(formData))
            .then(()=>{
                setChannelName('')
                setChannelPrice('')
                setChannelName('')
                setLanguage('')
                setIsHD('')
            }).catch((error) =>{
                if (error.response && error.response.data) {
                    dispatch(serverErrors(error.response.data.errors || []));
                    console.log(error.response.data.errors, "kkkkk")
                }else {
                    console.error("Unexpected error:", error);
                }
            })
        }else{
            setFormErrors(errors)
        }

    }

    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="channelName">Channel Name</label><br />
                <input type='text' value={channelName} placeholder="channel name.." id="channelName" onChange={(e)=>{
                    setChannelName(e.target.value)
                }} />
                {formErrors.channelName && <span>{formErrors.channelName}</span>}<br />
                
                <label htmlFor="channelPrice">Channel Price</label><br />
                <input type='number' value={channelPrice} placeholder="channel price.." id="channelPrice" onChange={(e)=>{
                    setChannelPrice(e.target.value)
                }} />
                {formErrors.channelPrice && <span>{formErrors.channelPrice}</span>}<br />

                <label htmlFor="channelNumber">Channel Number</label><br />
                <input type="number" value={channelNumber} placeholder="channel number.." id="channelNumber" onChange={(e)=>{
                    setChannelNumber(e.target.value)
                }} />
                {formErrors.channelNumber && <span>{formErrors.channelNumber}</span> }<br />
                <label htmlFor="language">Language</label><br />
                <input type='text' value={language} placeholder="language.." id="language" onChange={(e)=>{
                    setLanguage(e.target.value)
                }} />
                {formErrors.language && <span>{formErrors.language}</span>} <br />
                <br/>
                <div>
                    <input type='file' onChange={(e) =>{
                        setImage(e.target.files[0])
                    }}/>
                </div><br/>

                <input type='submit' />
                {/* {/* {serverErrors.map((ele, index)=>(
                 <div key={index}>{ele.msg}</div> */}
             
            {/* ))} */}
            </form>
           
            </div>
           
       
    )
}
export default AddChannel;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { startAddChannel } from "../../actions/channel-action";
// import { startGetPackage } from "../../actions/package-action";
// import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import "./channel.css"; // Make sure to import your CSS file

// const AddChannel = () => {
//   const dispatch = useDispatch();
//   const [channelName, setChannelName] = useState('');
//   const [channelPrice, setChannelPrice] = useState('');
//   const [isHD, setIsHD] = useState(false);
//   const [channelNumber, setChannelNumber] = useState('');
//   const [language, setLanguage] = useState('');
//   const [image, setImage] = useState(null);
//   const [formErrors, setFormErrors] = useState([]);

//   const errors = {};

//   function runValidations() {
//     if (channelName.trim().length === 0) {
//       errors.channelName = 'Channel name is required';
//     }
//     if (channelPrice.trim().length === 0) {
//       errors.channelPrice = 'Channel price is required';
//     }
//     if (channelNumber.trim().length === 0) {
//       errors.channelNumber = 'Channel number is required';
//     }
//     if (language.trim().length === 0) {
//       errors.language = 'Language is required';
//     }
//   }

//   const packages = useSelector((state) => {
//     return state.package.data;
//   });

//   useEffect(() => {
//     dispatch(startGetPackage());
//   }, [dispatch]);

//   const serverErrors = useSelector((state) => {
//     return state.channel.serverErrors;
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     runValidations();
//     if (Object.keys(errors).length === 0) {
//       const formData = new FormData();
//       formData.append("channelName", channelName);
//       formData.append("channelPrice", channelPrice);
//       formData.append("channelNumber", channelNumber);
//       formData.append("channelNumber", channelNumber);
//       formData.append("language", language);
//       formData.append("isHD", isHD);
//       formData.append("file", image);

//       dispatch(startAddChannel(formData))
//         .then(() => {
//           setChannelName('');
//           setChannelPrice('');
//           setChannelName('');
//           setLanguage('');
//           setIsHD('');
//         })
//         .catch((error) => {
//           if (error.response && error.response.data) {
//             dispatch(serverErrors(error.response.data.errors || []));
//           } else {
//             console.error("Unexpected error:", error);
//           }
//         });
//     } else {
//       setFormErrors(errors);
//     }
//   };

//   return (
//     <div className="container-custom mt-5 body-custom">
//       <Form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label className="label-custom" for="channelName">Channel Name</Label>
//           <Input
//             type="text"
//             className="input-custom"
//             value={channelName}
//             placeholder="Enter channel name"
//             id="channelName"
//             onChange={(e) => setChannelName(e.target.value)}
//           />
//           {formErrors.channelName && <span>{formErrors.channelName}</span>}
//         </FormGroup>

//         <FormGroup>
//           <Label  className="label-custom" for="channelPrice">Channel Price</Label>
//           <Input
//             type="number"
//             className="input-custom"
//             value={channelPrice}
//             placeholder="Enter channel price"
//             id="channelPrice"
//             onChange={(e) => setChannelPrice(e.target.value)}
//           />
//           {formErrors.channelPrice && <span>{formErrors.channelPrice}</span>}
//         </FormGroup>

//         <FormGroup>
//           <Label className="label-custom" for="channelNumber">Channel Number</Label>
//           <Input
//           className="input-custom"
//             type="number"
//             value={channelNumber}
//             placeholder="Enter channel number"
//             id="channelNumber"
//             onChange={(e) => setChannelNumber(e.target.value)}
//           />
//           {formErrors.channelNumber && <span>{formErrors.channelNumber}</span>}
//         </FormGroup>

//         <FormGroup>
//           <Label className="label-custom" for="language">Language</Label>
//           <Input
//             type="text"
//             className="input-custom"
//             value={language}
//             placeholder="Enter language"
//             id="language"
//             onChange={(e) => setLanguage(e.target.value)}
//           />
//           {formErrors.language && <span>{formErrors.language}</span>}
//         </FormGroup>

//         <FormGroup>
//           <Label className="label-custom" for="file">Upload Image</Label>
//           <Input
//             type="file"
//             className="input-custom"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </FormGroup>

//         <FormGroup check>
//           <Label className="label-custom" check>
//             <Input
//               type="checkbox"
//               className="input-custom"
//               checked={isHD}
//               onChange={() => setIsHD(!isHD)}
//             />{' '}
//             HD
//           </Label>
//         </FormGroup>

//         <Button color="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default AddChannel;


