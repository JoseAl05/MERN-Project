import {useState,useEffect} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const useAuth = () => {

    const [auth,setAuth] = useState(null);
    const [user,setUser] = useState({});
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        async function isAuth(){
            await axios.get('http://localhost:5000/api/logged-user/',{withCredentials:true})
            .then(res => {
                setUser(res.data);
                setAuth(true);
                setIsLoading(false);
            })
            .catch(error => {
                setAuth(false);
                console.log(error.message);
            });
        }
        console.log('i fire once');
        isAuth();
    },[]);

    return{
        auth:auth,
        user:user
    }
}
export default useAuth;


