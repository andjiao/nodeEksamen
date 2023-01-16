import NavBar from './components/navbar';
import RegisterForm from './components/registerForm';
import Signin from './components/signin';
import Login from './components/loginForm';

import About from './components/about';
import NotFound from './components/reUseable/notFound';
import { Route, Routes } from "react-router-dom"
import './App.css';


function App() {
  return (
    <>
      <NavBar/>
      <div className="container">
        <Routes>
        <Route path="/register" component={RegisterForm} />
          <Route path="/" element={<About/>}/>
          <Route path="/login" element ={<Login/>}/>
          <Route path="/signin" element= {<Signin/>}/>
          <Route path="/not-found" component={NotFound} />
        </Routes>
      </div>
    </>
  );
}

export default App

 
