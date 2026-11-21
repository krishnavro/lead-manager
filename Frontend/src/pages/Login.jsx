import React from 'react'
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        const LogDetail = {
            email,
            password
        }
        try{
            const response = await API.post('/auth/login',LogDetail);
            console.log(response.data);
            alert("Login Successfull");
            navigate('/dashboard');

        }catch(error){
            console.log(error.response?.data);
            alert(error.response?.data.message|| "Login Failed");
            
        }
    }
    const navigate = useNavigate();
  return (
   <>
   <form onSubmit={handleSubmit}>
    <h1>Login Form</h1>
    <label>Email: </label>
    <input type="email"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}/><br/><br/>

    <label>Password</label>
    <input type='password'
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
    /><br/><br/>
    <button type='submit'>Submit</button>
    </form>
   </>
  )
}

export default Login