import React,{useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { AuthContext, useAuth } from '../../contexts/AuthContext';


const Navbar = () => {

    const { setAuth,user} = useAuth();
    const navigate = useNavigate();

    const logout = async() => {
        const res = await axios.get(
            'http://localhost:5000/api/logout/',
            {
                withCredentials:true,
            }
        );
        console.log(res.data);
        setAuth(false);
        navigate('/login');
    }

    return(
        <section>
            <div className="custom-nav">
                <ul className="navbar-menu-left">
                    <li><Link to={"/dashboard/1"}>Games List</Link></li>
                </ul>
                <ul className="navbar-menu-right">
                    <li><Link to={"/profile"}>Welcome, {user}</Link></li>
                    <li><button type='button' onClick={logout}>Logout</button></li>
                </ul>
            </div>
        </section>
    )
}

export default Navbar;