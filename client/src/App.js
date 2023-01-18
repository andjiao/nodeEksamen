import { Component } from 'react';
import { Route, Routes} from "react-router-dom"
import {ToastContainer} from 'react-toastify'

import NavBar from './components/navbar';
//import ProtectedRoute from './components/reUseable/protectedRotue';
import Login from './components/loginForm';
import About from './components/about';
import NotFound from './components/reUseable/notFound';
import RegisterForm from './components/registerForm';
import GoodStudentForm from "./components/good/goodStudentForm";
import GoodStudents from './components/good/goodStudents';
import EvilStudentForm from './components/evil/evilStudentForm';
import EvilStudents from './components/evil/evilStudents';
import Logout from './components/logout';
import * as auth from './services/authService.js'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';


class App extends Component {
  state ={};

  componentDidMount(){
    const user = auth.getCurrentUser();
    this.setState({user});
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
          <Route path="/goodStudents/:id" element={GoodStudentForm} />
          <Route path="/goodStudents" element={<GoodStudents/>} />
          <Route path="/evilStudents/:id" element={EvilStudentForm} />
          <Route path="/goodStudents" element={EvilStudents} />
          <Route path="/not-found" element={<NotFound/>}/>
          
         {/*  <Route path="/goodStudents" 
          render ={props => <goodStudents {...props} user={this.state.user}/>}/>
          
          <Route element={<ProtectedRoute
          path="/goodStudents/:id"
          element={GoodStudentForm}/>}>
          </Route> */}

        </Routes>
      </div>
    </>
  );
}
}
export default App;

 
