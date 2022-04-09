import React, {Suspense} from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Register/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
