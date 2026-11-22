import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../styles/leads.css'

const ViewLeads = () => {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState('');
    const [filterSearch, setFilterSearch] = useState('All');
    const [currentPage , setCurrentPage] = useState(1);
    const leadsPerPage = 5;
    const [sortBy, setSortBy] = useState('newest');

    const filterLead = leads.filter((lead) => {
        const matchSearch = 
            lead.name.toLowerCase().includes(search.toLowerCase()) ||
            lead.email.toLowerCase().includes(search.toLowerCase()) ||
            lead.company.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = 
            filterSearch === 'All' || lead.status === filterSearch;

        return matchSearch && matchesStatus;
    });
     const sortedLeads = [...filterLead].sort((a,b) => {
        if (sortBy === 'nameAZ'){
            return a.name.localeCompare(b.name);
        }
        if (sortBy === 'nameZA'){
            return b.name.localeCompare(a.name);
        }
        if (sortBy === 'newest'){
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (sortBy === 'oldest'){
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return 0;
    });
    const startIndex = (currentPage- 1) * leadsPerPage;
    const endIndex = startIndex + leadsPerPage;
    const paginatedLeads = sortedLeads.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filterLead.length/ leadsPerPage);

   

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
    <div className="view-leads-container">
        <h1>View Leads</h1>

        <div className="lead-controls">
            <div className="search-box">
                <label>Search:</label>
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <select
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
            >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
            </select>

            <select
                value={sortBy}
                onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                }}
            >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="nameAZ">Name A-Z</option>
                <option value="nameZA">Name Z-A</option>
            </select>
            <button className='btn-style'
                onClick={()=> navigate('/addleads')}
            >Add Lead</button>
        </div>
        

        <div className="leads-table-container">
            <table>
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
                    {paginatedLeads.map((lead) => (
                        <tr key={lead._id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                            <td>{lead.company}</td>
                            <td>{lead.source}</td>
                            <td>{lead.status}</td>
                            <td>
                                <button onClick={() => navigate(`/edit-lead/${lead._id}`)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(lead._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Previous
            </button>

            <span>
                Page {currentPage} of {totalPages || 1}
            </span>

            <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    </div>
);
}

export default ViewLeads