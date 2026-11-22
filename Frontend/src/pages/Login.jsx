import React from 'react'
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import '../styles/login.css';
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
    <div className="login-container">
        <form className="login-card" onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className="login-form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="login-form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit">Login</button>
        </form>
    </div>
);
}

export default Login