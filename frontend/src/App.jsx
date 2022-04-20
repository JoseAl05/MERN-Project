import React, { useEffect } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import axios from 'axios';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';
import Profile from './components/Profile/Profile';
import ConfirmRegister from './components/ConfirmRegister/ConfirmRegister';
import RegisterMessage from './components/RegisterMessage/RegisterMessage';
import useAuth from './hooks/useAuth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Register/>}/>

          <Route path="/profile"
                 element={
                  <PrivateRoute>
                    <Profile/>
                  </PrivateRoute>
                 }
          />

          <Route path="/confirm-register/:tokenConfirm" element={<ConfirmRegister/>}/>
          <Route path="/registered" element={<RegisterMessage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
