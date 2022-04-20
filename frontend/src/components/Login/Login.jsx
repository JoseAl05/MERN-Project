import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () =>{

    let navigate = useNavigate();


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

        await axios.post("http://localhost:5000/api/signin/",{
            email:email.email,
            password:password.password
        },{
            withCredentials:true,
        })
        .then(res => {
            setIsSubmitted(true);
            if(res.status === 200){
                alert('!LOGGED');
                setTimeout(() => navigate('/profile'), 1000);
                return res.data;
            }
        })
        .catch(error => {
            setIsSubmitted(true);
            let parsedErrors = [];
            parsedErrors = JSON.parse(error.request.response);

            if(typeof parsedErrors === 'object'){
                const objectErrorToArray = Object.values(parsedErrors);
                console.log(objectErrorToArray);
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
                <div className='login-module'>
                    <div className='border-login'>
                        <h1>Login</h1>
                        <form onSubmit={login}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter your email" onChange={handleEmailChange}/>
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
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter your Password" onChange={handlePasswordChange}/>
                                {isSubmitted && typeof handleErrors === 'object' && handleErrors.param === 'password' &&
                                    <small className='error-msg'>
                                        * {handleErrors.msg}<br/>
                                    </small>
                                }
                            </div>
                            <button type="submit" className="btn btn-primary">Login!</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;