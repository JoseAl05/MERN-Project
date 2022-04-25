import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';
import Profile from './components/Profile/Profile';
import ConfirmRegister from './components/ConfirmRegister/ConfirmRegister';
import RegisterMessage from './components/RegisterMessage/RegisterMessage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useAuth } from './contexts/AuthContext';
import NotAuthNavbar from './components/Navbar/NotAuthNavbar';


function App() {

  const { auth } = useAuth();

  return (
    <>
      <Router>
        {auth ? <Navbar/> : <NotAuthNavbar/>}
        <Routes>
            <Route exact path="/" element={<Dashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="/profile"element={<Profile/>}/>
            <Route path="/confirm-register/:tokenConfirm" element={<ConfirmRegister/>}/>
            <Route path="/registered" element={<RegisterMessage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
