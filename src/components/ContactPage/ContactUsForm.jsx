// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form';

// const ContactUsForm = () => {
//     const [loading, setloading] = useState(false);

//     const submitContactForm = async (data)=>{

//     }

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: {errors, isSubmitSuccessful}
//     } = useForm();

//     useEffect( () =>  {
//         if(isSubmitSuccessful){
//             reset({
//                 email: "",
//                 firstName: "",
//                 lastName: "",
//                 message: "",
//                 phoneNo: "",
//             }[reset, isSubmitSuccessful])
//         }
//     } )
//   return (
//     <form onSubmit={handleSubmit}>

//     </form>
//   )
// }

// export default ContactUsForm

import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data" , data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

    <div className='flex flex-col gap-6'>
            <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor='firstname' className='text-richblack-300 font-inter ' >First Name</label>
                    <input  
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className='text-pure-greys-50 bg-richblack-700 p-2 rounded-md '
                        {...register("firstname", {required:true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter Your name
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor='lastname' className='text-richblack-300 font-inter ' >Last Name</label>
                    <input  
                        type='text'
                        name='lastname'
                        id='lastname'
                        className='text-pure-greys-50 bg-richblack-700 p-2 rounded-md '
                        placeholder='Enter Last name'
                        {...register("lastname")}
                    />
                    
                </div>

            </div>


            {/* email */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-richblack-300 font-inter ' >Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    className='text-pure-greys-50 bg-richblack-700 p-2 rounded-md '
                    placeholder='Enter email Address'
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* phoneNo */}
            <div className='flex flex-col gap-2'>

                <label htmlFor='phonenumber' className='text-richblack-300 font-inter' >Phone Number</label>

                <div className='flex flex-row gap-2'>
                    {/* dropdown */}
                   
                        <select
                            name='dropdown'
                            id="dropdown"
                            className='text-pure-greys-50 bg-richblack-700 p-2 rounded-md w-[70px]'
                            {...register("countrycode", {required:true})}
                        >
                            {
                                CountryCode.map( (element , index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                } )
                            }
                        </select>
                        
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='text-pure-greys-50 bg-richblack-700 p-2 rounded-md  w-[calc(100%-90px)]'
                            {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}
                        />
                  
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>

            {/* message */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='message' className='text-richblack-300' >Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    className='text-pure-greys-50 bg-richblack-700 p-2 rounded-md'
                    rows="7"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span>
                            PLease enter your message.
                        </span>
                    )
                }
            </div>
                
            <button type='submit'
            className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black p-2'>
                    Send Message
            </button>
    </div>

    </form>
  )
}

export default ContactUsForm
