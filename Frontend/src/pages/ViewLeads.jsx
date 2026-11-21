import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const ViewLeads = () => {
    const [leads, setLeads] = useState([]);

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
    const navigate = useNavigate();
    async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this lead?");

    if (!confirmDelete) return;

    try {
        await API.delete(`/${id}`);

        setLeads((prevLeads) =>
            prevLeads.filter((lead) => lead._id !== id)
        );

        alert("Lead deleted successfully");
    } catch (error) {
        console.log(error);
        alert("Failed to delete lead");
    }
}
  return (
    <>
        <h1>View Leads</h1>
        <br/><br/>
        <table border={1}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {leads.map((lead) =>(
                    <tr key={lead._id}>
                        <td>{lead.name}</td>
                        <td>{lead.email}</td>
                        <td>{lead.phone}</td>
                        <td>{lead.company}</td>
                        <td>{lead.source}</td>
                        <td>{lead.status}</td>
                        <td>
                            <button onClick={()=> navigate(`/edit-lead/${lead._id}`)}
                            >Edit</button>
                            <button onClick={() => handleDelete(lead._id)}
                            >Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default ViewLeads