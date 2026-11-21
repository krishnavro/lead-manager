import {Routes,Route} from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddLeads from './pages/AddLeads';
import ViewLeads from './pages/ViewLeads';
import EditLead from './pages/EditLead';

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/addleads" element={<ProtectedRoute><AddLeads/></ProtectedRoute>}/>
        <Route path="/viewleads" element={<ProtectedRoute><ViewLeads/></ProtectedRoute>}/>
        <Route path="/edit-lead/:id" element={<ProtectedRoute><EditLead/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
