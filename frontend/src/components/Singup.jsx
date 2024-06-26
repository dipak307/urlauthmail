import React, { useState } from 'react'
import "./Signup.css";
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
const Singup = () => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;
       const submitHandler=(e)=>{
           e.preventDefault();
           Axios.post("https://urlauthmail-edse.vercel.app/auth/signup",{username,email,password})
            .then(response=>{
                 if(response.data.status){
                     navigate("/login")
                 }
                console.log(response)
            }
            )
            .catch(err=>console.log(err));
       }

  return (
    <div className='sign-up-container'>
            <h2>Sign Up</h2>
        <form className='sign-up-form' onSubmit={submitHandler} method='post'>

            <label>UserName: </label>
            <input type='text' name='username' placeholder='enter your username' onChange={(e)=>{setUsername(e.target.value)}}/>
            <label>Email: </label>
            <input type='email' name='email' placeholder='enter your email' onChange={(e)=>{setEmail(e.target.value)}}/>
            <label>Password: </label>
            <input type='password' name='password' placeholder='enter your password' onChange={(e)=>{setPassword(e.target.value)}}/>
           <button type='submit' >Sign Up</button>
           <p>Already Have an Account?<Link to='/login'> Login</Link></p>
        </form>
    </div>
  )
}

export default Singup;
