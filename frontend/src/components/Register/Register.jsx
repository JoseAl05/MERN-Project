import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
        await axios.post("http://localhost:5000/api/signup/",{
            username:signUpForm.username,
            email:signUpForm.email,
            password:signUpForm.password,
            repassword:signUpForm.repassword
        },
        {
            withCredentials:true,
        })
        .then(res => {
            setIsSubmitted(true);

            setTimeout(() => navigate('/registered/'), 2000);
            console.log(res.data);

            return res.data
        })
        .then(res => console.log(res.data))
        .catch(error => {
            setIsSubmitted(true);

            let parsedErrors = [];
            parsedErrors = JSON.parse(error.request.response);
            if(typeof parsedErrors === 'object'){
                const objectErrorToArray = Object.values(parsedErrors);
                setHandleErrors(objectErrorToArray[0]);
            }else{
                setHandleErrors({name:parsedErrors.map(errors => errors.param),error:parsedErrors.map(errors => errors.msg)});
            }
        })
    }

    useEffect(() => {
        getCSRFToken();
    },[])

    return(
        <>
            <section>
                <div className='register-module'>
                    <h1>Register</h1>
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter your email" onChange={handleSignUpFormChange}/>
                            {isSubmitted && typeof handleErrors === 'object' && handleErrors.param === 'email' &&
                                <small className='error-msg'>
                                    * {handleErrors.msg}<br/>
                                </small>
                            }
                            {isSubmitted && typeof handleErrors === 'string' &&
                                <small className='error-msg'>
                                    * {handleErrors}<br/>
                                </small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" placeholder="Enter username" onChange={handleSignUpFormChange}/>
                            {isSubmitted && typeof handleErrors === 'object' && handleErrors.param === 'username' &&
                                <small className='error-msg'>
                                    * {handleErrors.msg}<br/>
                                </small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleSignUpFormChange}/>
                            {isSubmitted && typeof handleErrors === 'object' && handleErrors.param === 'password' &&
                                <small className='error-msg'>
                                    * {handleErrors.msg}<br/>
                                </small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="re-password">Repeat your password</label>
                            <input type="password" className="form-control" name="repassword" onChange={handleSignUpFormChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Register;