import React,{useState} from 'react';
import {Navigate,useLocation} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


function PrivateRoute({children}){

    const [isLoading,setIsLoading] = useState(true);
    const auth = useAuth();
    const location = useLocation();

    if(auth.auth === null){
        return <div>Loading........</div>;
    }

    return auth.auth ? children : <Navigate to='/login' replace state={{from:location}}/>;
}

export default PrivateRoute;