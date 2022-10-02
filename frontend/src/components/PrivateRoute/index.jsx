import React from 'react'
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children}) => {
        
    let  isAuthenticated = localStorage.getItem("token") == null ? false : true;

    if (isAuthenticated ) {
      return children
    }
      
    return <Navigate to="/" />
  }