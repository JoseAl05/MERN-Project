import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Errors from '../Errors/Errors';
import './Login.css';

const Login = () =>{

    let navigate = useNavigate();

    const {setAuth} = useAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [handleErrors,setHandleErrors] = useState();
    const [isSubmitted,setIsSubmitted] = useState(false);


    const handleEmailChange = (e) => {
        setEmail({
          ...email,
          [e.target.name]:e.target.value
        });
    };


    const handlePasswordChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]:e.target.value
        });
    };
    const getCSRFToken = async() => {
        await axios.get('http://localhost:5000/api/getCSRFToken/',{withCredentials:true})
        .then(res => axios.defaults.headers.post['X-CSRF-Token'] = res.data)
        return;
    }

    const login = async(e) => {

        e.preventDefault();

        try{
            const res = await axios.post(
                'http://localhost:5000/api/signin/',
                {
                    email:email.email,
                    password: password.password
                },
                {
                    withCredentials:true,
                }
            );

            if(res.status === 200){
                alert('!LOGGED');
                setAuth(true);
                navigate('/profile');
            }
        } catch(error){
            let parsedErrors = [];
            parsedErrors = JSON.parse(error.request.response);
            console.log(error.request.response);
            console.log(parsedErrors);
            setHandleErrors(parsedErrors);
        }finally{
            setIsSubmitted(true);
        }
    }
    useEffect(() => {
        getCSRFToken();
    },[])

    return(
        <>
            <section>
                <div className='login-module'>
                    <ul class="select-form-list">
                        <li class="select-form-label"><Link to={"/signup"}>Sign up</Link></li>
                        <li class="select-form-label select-form-label-active"><Link to={"/login"}>Sign in</Link></li>
                    </ul>
                    <form onSubmit={login} className="border-login-form">
                        <h1>Login</h1>
                        {isSubmitted && handleErrors && <Errors error={handleErrors} isSubmitted={isSubmitted} />}
                        <br />
                        <div className="login-form">
                            <input type="email" className="input-login-email" name="email" placeholder="" onChange={handleEmailChange} autoComplete='off' />
                            <label htmlFor="email" className="label-login-email">
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className="label-icon-login"/>
                                <span className="label-login-content">Email</span>
                            </label>
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className="login-form">
                            <input type="password" className="input-login-password" name="password" placeholder="" onChange={handlePasswordChange} />
                            <label htmlFor="password" className="label-login-password">
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className="label-icon-login"/>
                                <span className="label-login-content">Password</span>
                            </label>
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <button type="submit" className="btn-submit-login">Login!</button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Login;