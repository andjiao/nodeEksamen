import React from "react";
import Form from "./reUseable/form";
import Joi from 'joi-browser'

class loginForm extends Form{
  state = {  
    data:{email:"", password:""},
    errors:{}
  } 

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  render() { 
    return (
      <div>
        <h1>Login</h1>
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('email', 'Email')}
        {this.renderInput('password', 'Password', "password")}
        {this.renderButton('Login')}
      </form>
      </div>  
    );
  }
}
 
export default loginForm;