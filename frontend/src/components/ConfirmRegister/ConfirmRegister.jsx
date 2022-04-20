import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './ConfirmRegister.css';

const ConfirmRegister = () => {

    let navigate = useNavigate();

    const {tokenConfirm} = useParams();
    const [isConfirmed,setIsConfirmed] = useState(false);

    const confirmRegistrationToken = async() => {
        await axios.get(`http://localhost:5000/api/confirm-account/${tokenConfirm}`,{withCredentials:true})
        .then(res => {
            console.log(res.data)
            alert('Verified account, you can access the website!')
            setIsConfirmed(true);
            setTimeout(() => navigate('/login'), 1000);
            return;
        })
        .catch(error => {
            console.log(error);
            return;
        });
    }
    useEffect(() => {
        confirmRegistrationToken();
    },[])

    return(
        <section>
            {!isConfirmed &&
                <div className='container'>
                    <h1>Error with the confirmation!.</h1>
                    <p>Please check your email again!</p>
                </div>
            }
            {isConfirmed &&
                <div className='container'>
                    <h1>Successful registration.</h1>
                    <p>Please log in into your account!</p>
                </div>
            }
        </section>
    )

}

export default ConfirmRegister;