import React from 'react';
import { Route, Navigate } from "react-router-dom"
import * as auth from '../../services/authService.js'

const ProtectedRote = ({path, component: Component, render, ...rest}) => {
    return <Route 
    //path= {path} 
    {...rest}
    render={props =>{ 
      if(!auth.getCurrentUser()) return <Navigate to={{
          pathname:'/login',
          state: {from:props.location}

      }} replace />
      return  Component? <Component{...props} />: render(props)
      }} />;
}
 
export default ProtectedRote;