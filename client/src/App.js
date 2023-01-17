import { Component } from 'react';
import { Route, Routes} from "react-router-dom"
import {ToastContainer} from 'react-toastify'

import NavBar from './components/navbar';
import ProtectedRote from './components/reUseable/protectedRote';
import Login from './components/loginForm';
import About from './components/about';
import NotFound from './components/reUseable/notFound';
import RegisterForm from './components/registerForm';
import GoodStudentForm from "./components/goodStudentForm";
import EvilStudentForm from './components/evilStudentForm';
import Logout from './components/logout';
import * as auth from './services/authService.js'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';


function App() {
  state ={}

  componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState({user})
  
   
  }
  render(){
    const {user} = this.state
  return (
    <>
    <ToastContainer/>
      <NavBar user={user}/>
      <div className="container">
        <Routes>
        <Route path="/" element={<About/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/login" element ={<Login/>}/>
          <Route path="/logout" element ={<Logout/>}/>
          <Route path="/goodStudents" 
          render ={props => <goodStudents {...props} user={this.state.user}/>}/>
          <ProtectedRote 
          path="/goodStudents/:id"
          component={GoodStudentForm}/>
          <Route path="/evilStudents/:id" element={<EvilStudentForm />}/>
          <Route path="/not-found" element={<NotFound/>}/>
        </Routes>
      </div>
    </>
  );
}
}
export default App;

 
