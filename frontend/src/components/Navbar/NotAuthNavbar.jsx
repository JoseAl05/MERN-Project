import React from 'react';
import {Link,Outlet} from 'react-router-dom';
import './Navbar.css';


const NotAuthNavbar = () => {


    return(
        <section>
            <div className="custom-nav">
                <ul className="navbar-menu-left">
                    <li><Link to={"/"}>Games List</Link></li>
                </ul>
                <ul className="navbar-menu-right">
                    <li><Link to={"/signup"}>Sign Up</Link></li>
                    <li><Link to={"/login"}>Sign In</Link></li>
                </ul>
            </div>
        </section>
    )
}

export default NotAuthNavbar;