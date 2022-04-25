import React,{useState} from 'react';
import {Navigate,useLocation} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


function IsAuth({children, component}){
    const auth = useAuth();
    const location = useLocation();

    if(auth.auth === null){
        return null;
    }

    return auth.auth ? children : component;
}

export default IsAuth;