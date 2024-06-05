
import React, { useState } from 'react'
import "./Signup.css";
import Axios from "axios";
import {  useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const [email,setEmail]=useState('')
    const navigate=useNavigate();
     axios.defaults.withCredentials=true;
       const submitHandler=(e)=>{
           e.preventDefault();
           Axios.post("https://urlauthmail-edse.vercel.app/auth/forgotpassword",{email})
            .then(response=>{
                 if(response.data.status){
                     alert("check your email reset password link!")
                     navigate("/login")
                 }
                console.log(response)
            }
            )
            .catch(err=>console.log(err));
       }

  return (
    <div className='sign-up-container'>
    <h2>Forgot Password</h2>
<form className='sign-up-form' onSubmit={submitHandler} method='post'>
 <label>Email: </label>
    <input type='email' name='email' placeholder='enter your email' onChange={(e)=>{setEmail(e.target.value)}}/>
    <button type='submit' >Send</button>
</form>
</div>
  )
}

export default ForgotPassword;
