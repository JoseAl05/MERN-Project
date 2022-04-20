import React,{useState,useEffect, useContext} from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import useAuth from '../../hooks/useAuth';


const Navbar = () => {

    const logout = async() =>{
        await axios.get("http://localhost:5000/api/logout/",{withCredentials:true})
        .then(res => {
            console.log(res.data);
            return res.data;
        });
    }

    return(
        <section>
            <div className="navbar">
                <ul className="navbar-menu">
                    <li><Link to={"/dashboard"}>Dashboard</Link></li>
                    <li><Link to={"/signup"}>Sign Up</Link></li>
                    <li><Link to={"/login"}>Sign In</Link></li>
                    <li><Link to={"/profile"}>Welcome</Link></li>
                    <li><Link to={"/login"} onClick={logout}>Logout</Link></li>
                </ul>
            </div>
        </section>
        )
}

export default Navbar;