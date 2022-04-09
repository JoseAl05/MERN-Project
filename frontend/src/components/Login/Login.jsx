import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    let navigate = useNavigate();

    const handleEmailChange = (e) => {
        setUsername({
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

    const login = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/signin/",{
            email:email.email,
            password:password.password
        },{
            withCredentials:true,
        })
        .then(res => {
            if(res.status === 200){
                alert('!LOGGED');
                return res.data
            }
        })
        .catch(err => {
            alert('!ERRRROOOOOOOOORRRR');
            return err;
        })
    }

    return(
        <>
            <section>
                <div className='login-module'>
                    <div className='border-login'>
                        <h1>Login</h1>
                        <form onSubmit={login}>
                            <div className="form-group">
                                <label htmlFor="username">Email</label>
                                <input type="text" className="form-control" name="username" placeholder="Enter your email" onChange={handleEmailChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter your Password" onChange={handlePasswordChange}/>
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