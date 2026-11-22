import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../styles/dashboard.css'
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);

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

  useEffect(()=>{
        
             async function fetchLeads(){
                try{
            const response = await API.get('/leads');
            setLeads(response.data.leads);
        }
        catch(error){
            console.log(error);
        }
    }
        fetchLeads();
    
    },[]);
    const totalLeads = leads.length;
    const newLeads = leads.filter((lead) => lead.status==='New').length;
    const contactedLeads = leads.filter((lead) => lead.status==='Contacted').length;
    const qualifiedLeads = leads.filter((lead) => lead.status==='Qualified').length;
    const lostLeads = leads.filter((lead) => lead.status==='Lost').length;
  const navigate = useNavigate();

  async function addLeads(){
    navigate('/addleads');
  }
  async function viewLeads(){
    navigate('/viewleads');
  }



  return (
    <div className='dashboard-container'>
      <h1>Lead Manageer Dashboard</h1>

      {user ? (
        <h2>Welcome, {user?.name}</h2>
      ): (
        <p>User Loading.......</p>
      )}
      <div className='stats-container'>
        <h2>Lead Summary</h2>
        <div className='total-card'>
        <div className='stat-card'>
          <h3>Total Leads</h3>
          <p>{totalLeads}</p>
        </div>
        </div>
        <div className='stat-card'>
          <h3>New</h3>
          <p>{newLeads}</p>
        </div>
        <div className='stat-card'>
        <h3>Contacted</h3>
        <p>{contactedLeads}</p>
        </div>

        <div className='stat-card'>
            <h3>Qualified</h3>
            <p>{qualifiedLeads}</p>
        </div>

        <div className='stat-card'>
            <h3>Lost</h3>
            <p>{lostLeads}</p>
        </div>
        </div>
      
      <br/>
      <div className='dashboard-actions'>
      <button onClick={addLeads}>Add Leads</button><br/><br/>
      <button onClick={viewLeads}>View Leads</button><br/><br/>
      
    </div>
    </div>
  );
}

export default Dashboard