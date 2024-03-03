import React from 'react'
import { Navigate } from 'react-router-dom'

export const Protected = ({children}) => {
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to='/' />;
    }
    return children;
}

export const Protect =({children}) => {
    if(localStorage.getItem('token')){
        localStorage.clear()
    }
    return children;
}
