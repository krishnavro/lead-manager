import React from 'react';
import { useState,useEffect } from 'react';
import API from '../services/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const EditLead = () => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: '',
    status: 'New'
});

useEffect(()=>{
    async function fetchLead(){
        try{
            const response = await API.get(`/${id}`);
            setFormData(response.data.editLead);

        }catch(error){
            console.log(error);
        }
    }
    fetchLead();
},[])

const navigate = useNavigate();
async function handleSubmit(e){
    e.preventDefault();

    try{
        await API.put(`/${id}`,formData);
        alert("Updated Successfully");
        navigate('/viewleads');

    }catch(error){
        console.log(error);
    }
}
  return (
    <div>
        <h1>Edit Lead</h1>

        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({
                    ...formData,
                    name: e.target.value
                })}
            /><br/><br/>

            <label>Email</label>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({
                    ...formData,
                    email: e.target.value
                })}
            /><br/><br/>

            <label>Phone</label>
            <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({
                    ...formData,
                    phone: e.target.value
                })}
            /><br/><br/>

            <label>Company</label>
            <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({
                    ...formData,
                    company: e.target.value
                })}
            /><br/><br/>

            <label>Source</label>
            <select
                value={formData.source}
                onChange={(e) => setFormData({
                    ...formData,
                    source: e.target.value
                })}
            >
                <option value="">Select Source</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
            </select><br/><br/>

            <label>Status</label>
            <select
                value={formData.status}
                onChange={(e) => setFormData({
                    ...formData,
                    status: e.target.value
                })}
            >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
            </select><br/><br/>

            <button type="submit">Update Lead</button>
        </form>
    </div>
);
}
export default EditLead