import React from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import '../styles/navbar.css';
import API from '../services/api';
const Navbar = () => {
    const location = useLocation();
    const isRegister = location.pathname === '/register';
    const isLogin = location.pathname === '/login';
    const navigate = useNavigate();
    async function handleLogout(){
    const UserLogout = await API.post('/auth/logout');
    navigate('/login');
  }
  return (
    <nav className="navbar">
    <h2>Leader Manager</h2>

    <div className="nav-links">
        {isRegister && (
            <button onClick={()=> navigate('/login')}>Login</button>)}

        {isLogin && (
            <button onClick={()=> navigate('/register')}
        >Register</button>)}

        {!isRegister && !isLogin && (
            <>
                <button onClick={()=> navigate('/dashboard')}>Dashboard</button>
                <button onClick={() => navigate('/viewleads')}>View Leads</button>
                <button onClick={handleLogout}>Logout</button>
            </>
        )}
    </div>
</nav>
  )
}

export default Navbar