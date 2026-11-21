import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../services/api';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    
    async function handelSubmit(e){
        e.preventDefault();

        const userData={
            name,
            email,
            phone,
            password
        };
        try{
            const response = await API.post('/auth/register',userData);
            console.log(response.data);
            alert("Registeration Successful");
            navigate('/login');
        }catch(error){
            console.log(error.response?.data);
            alert(error.response?.data?.message || "Registeration Failed");
        }
    }
    const navigate = useNavigate();

  return (
    <div>
        <h1>Create Account</h1>
        <form onSubmit={handelSubmit}>
            <label>Name: </label>
            <input type="text"
             value = {name}
             onChange={(e)=> setName(e.target.value)}
             /><br/><br/>
             <label>Email: </label>
             <input type="email"
             value = {email}
             onChange={(e)=> setEmail(e.target.value)}
             /><br/><br/>
             <label>Phone No.</label>
             <input type="tel"
             value = {phone}
             onChange={(e)=> setPhone(e.target.value)}
             /><br/><br/>
             <label>Password</label>
             <input type="password"
             value = {password}
             onChange={(e)=> setPassword(e.target.value)}
             /><br/><br/>

             <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register;