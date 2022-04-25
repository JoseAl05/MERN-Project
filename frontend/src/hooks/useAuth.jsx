import {useState,useEffect} from 'react';
import axios from 'axios';

const useAuth = () => {

    const [user,setUser] = useState({});

    const isAuth = async() => {
        await axios.get('http://localhost:5000/api/logged-user/',{withCredentials:true})
        .then(res => {
            return true;
        })
        .catch(error => {
            return false;
        });
    }


    useEffect(() => {
        isAuth();
    },[])
}
export default useAuth;


