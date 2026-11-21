import React from 'react'
import API from '../services/api'
import { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const [isAuthenticate, setIsAuthenticate] = useState(null);

    useEffect(() =>{
        async function checkAuth(){
            try{
                await API.get('/auth/me');
                setIsAuthenticate(true);

            }catch(error){
                setIsAuthenticate(false);
            }
        }
        checkAuth();
    },[]);
    if(isAuthenticate== null){
        return <p>Loading....</p>
    }
    if(!isAuthenticate){
        return <Navigate to='/login' replace/>
    }
    return children;
}

export default ProtectedRoute