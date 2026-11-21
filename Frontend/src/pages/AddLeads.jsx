import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const AddLeads = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: '',
    status: 'New'
  });

  async function handleSubmit(e){
    e.preventDefault();
    try{
      const response = await API.post('/addleads',formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        source: '',
        status: 'New'
      });
      navigate('/viewleads');

    }catch(error){
      console.log(error.response?.data);
      console.log(error.response?.data?.message|| "Adding lead Failed");
    }


  }
  const navigate = useNavigate();


  return (
    <>
    <h1>Add</h1>
    <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input type='name'
      value={formData.name}
      onChange={(e) => setFormData({...formData,name: e.target.value})}/><br/><br/>

      <label>Email</label>
    <input type='email'
      value={formData.email}
      onChange={(e) => setFormData({...formData,email: e.target.value})}/><br/><br/>

      <label>Phone</label>
    <input type='tel'
      value={formData.phone}
      onChange={(e) => setFormData({...formData,phone: e.target.value})}/><br/><br/>

      <label>Company</label>
    <input type='string'
      value={formData.company}
      onChange={(e) => setFormData({...formData,company: e.target.value})}/><br/><br/>
<label>Source</label>
    <select 
      value={formData.source}
      onChange={(e) => setFormData({...formData,source: e.target.value})}>
        <option value="">Selected Disabled</option>
        <option value="LinkedIn">Linked In</option>
        <option value="Website">Website</option>
        <option value="Refferal">Refferal</option>
        <option value="Other">Other</option>
        </select><br/><br/>
        <label>Source</label>
    <select
      value={formData.status}
      onChange={(e) => setFormData({...formData,status: e.target.value})}>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
        </select><br/><br/>
        <button type='submit'>Add Lead</button>
    </form>
</>
  )
}

export default AddLeads