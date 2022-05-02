import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import './Register.css';


const Register = () =>{

    let navigate = useNavigate();

    const [signUpForm,setsignUpForm] = useState({});
    const [handleErrors,setHandleErrors] = useState();
    const [isSubmitted,setIsSubmitted] = useState(false);

    const getCSRFToken = async() => {
        await axios.get('http://localhost:5000/api/getCSRFToken/',{withCredentials:true})
        .then(res => axios.defaults.headers.post['X-CSRF-Token'] = res.data)
        console.log(axios.head['X-CSRF-Token']);
    }

    const handleSignUpFormChange = (e) => {
        setsignUpForm({
          ...signUpForm,
          [e.target.name]:e.target.value
        });
    };

    const register = async(e) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:5000/api/signup/",
                {
                    username: signUpForm.username,
                    email: signUpForm.email,
                    password: signUpForm.password,
                    repassword: signUpForm.repassword
                },
                {
                    withCredentials: true,
                }
            );

            if(res.status === 200){
                navigate('/registered/');
            }
        }catch(error){
            let parsedErrors = [];
            parsedErrors = JSON.parse(error.request.response);
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
                <div className='register-module'>
                    <ul className="select-form-list">
                        <li className="select-form-label select-form-label-active"><Link to={"/signup"}>Sign up</Link></li>
                        <li className="select-form-label"><Link to={"/login"}>Sign in</Link></li>
                    </ul>
                    <form onSubmit={register} className="border-register-form">
                        <h1 className="register-header">Register</h1>
                        <div className="register-form">
                            <input type="email" className="input-register-email" name="email" placeholder="" onChange={handleSignUpFormChange} autoComplete='off'/>
                            <label htmlFor="email" className="label-register-email">
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className="label-icon-register"/>
                                <span className="label-register-content">Email</span>
                            </label>
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className="register-form">
                            <input type="text" className="input-register-username" name="username" placeholder="" onChange={handleSignUpFormChange} autoComplete='off'/>
                            <label htmlFor="username" className="label-register-username">
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className="label-icon-register"/>
                                <span className="label-register-content">Username</span>
                            </label>
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className="register-form">
                            <input type="password" className="input-register-password" name="password" placeholder="" onChange={handleSignUpFormChange} autoComplete='off'/>
                            <label htmlFor="password" className="label-register-password">
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className="label-icon-register"/>
                                <span className="label-register-content">Password</span>
                            </label>
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className="register-form">
                            <input type="password" className="input-register-repassword" name="repassword" placeholder="" onChange={handleSignUpFormChange} autoComplete='off'/>
                            <label htmlFor="repassword" className="label-register-repassword">
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className="label-icon-register"/>
                                <span className="label-register-content">Repeat your Password</span>
                            </label>
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <button type="submit" className="btn-submit-register">SignUp!</button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Register;