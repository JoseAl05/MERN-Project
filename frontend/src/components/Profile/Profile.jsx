import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import { Navigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const Profile = () => {
    const location = useLocation();
    const {user,auth} = useAuth();
    console.log(auth);
    console.log(user);

    return auth ?
    (
        <div className='container'>
            <div className='row'>
                <FontAwesomeIcon icon={faUser} size='10x' color='white' />
                <h1>Hola, {user}</h1>
            </div>
            <div className='col-sm-8'>
                <h1>Profile Content</h1>
            </div>
        </div>
    )
    :
    (
        <Navigate to='/login' replace state={{from:location}}/>
    )
}

export default Profile;