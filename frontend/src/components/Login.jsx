import React from 'react'
import "./Login.css"
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Axios from 'axios'
const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    Axios.defaults.withCredentials=true;

    const navigate=useNavigate();
       const submitHandler=(e)=>{
           e.preventDefault();
           console.log("clicked..")
           Axios.post("https://urlauthmail-edse.vercel.app/auth/login",{email,password})
            .then(response=>{
                 if(response.data.status){
                     navigate("/")
                 }
                console.log(response)
            }
            )
            .catch(err=>console.log(err));
       }

  return (
    <div className='login-container'>
    <h2>Sign In</h2>
<form className='login-form' onSubmit={submitHandler} method='post'>

   <label>Email: </label>
    <input type='email' name='email' placeholder='enter your email' onChange={(e)=>{setEmail(e.target.value)}}/>
    <label>Password: </label>
    <input type='password' name='password' placeholder='enter your password' onChange={(e)=>{setPassword(e.target.value)}}/>
   <button type='submit' >Login</button>
   <Link to="/forgotpassword">Forgot Password?</Link>
   <p>Dont Have an Account?<Link to='/signup'> SignUp</Link></p>
</form>
</div>
  )
}

export default Login;
