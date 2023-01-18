import React from 'react';
import { Outlet, Navigate } from "react-router-dom"
import * as auth from '../../services/authService.js'

const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
    return (
    <Outlet 
    //path= {path} 
    {...rest}
    render={props =>{ 
      if(!auth.getCurrentUser()) 
      return( 
      <Navigate to={{
          pathname:'/login',
          state: {from:props.location}

      }} 
      />
      )
      return  Component? <Component{...props} />: render(props)
      }}
       />
       );
    }
 
export default ProtectedRoute;