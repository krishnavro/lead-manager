import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(()=> {
    async function fetchUser(){
      try{
        const response = await API.get('/auth/me');
        setUser(response.data.user);

      }catch(error){
        console.log(error);
      }
    }
    fetchUser()
  },[]);
  const navigate = useNavigate();
  async function handleLogout(){
    const UserLogout = await API.post('/auth/logout');
    navigate('/login');
  }
  return (
    <div>
      <h1>Lead Manageer Dashboard</h1>

      {user ? (
        <h2>Welcome, {user.name}</h2>
      ): (
        <p>User Loading.......</p>
      )}
      <br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard