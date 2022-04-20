import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { useNavigate,Navigate } from 'react-router-dom';
import './Profile.css';


const Profile = () => {
    return(
        <section>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <FontAwesomeIcon icon={faUser} size='10x' color='white'/>
                        <h1>Hola</h1>
                    </div>
                    <div className='col-sm-8'>
                        <h1>Profile Content</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;