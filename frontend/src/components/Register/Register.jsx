import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';


const Register = () =>{

    let navigate = useNavigate();

    const [signUpForm,setsignUpForm] = useState({});

    const handleSignUpFormChange = (e) => {
        setsignUpForm({
          ...signUpForm,
          [e.target.name]:e.target.value
        });
    };

    const register = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/test/",{
            username:signUpForm.username,
            email:signUpForm.email,
            password:signUpForm.password
        })
        .then(res => {
            setTimeout(() => navigate('/login'), 2000);
            return res.data
        })
        .then(res => console.log(res))
    }

    return(
        <>
            <section>
                <div className='register-module'>
                    <h1>Register</h1>
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter your email" onChange={handleSignUpFormChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" placeholder="Enter username" onChange={handleSignUpFormChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleSignUpFormChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Register;