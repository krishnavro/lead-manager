import React from 'react'
import { useState,useEffect } from 'react'
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
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default ViewLeads