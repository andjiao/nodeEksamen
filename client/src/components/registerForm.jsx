import React from "react";
import Joi from "joi-browser";
import Form from "./reUseable/form";
import * as userService from '../services/userService.js'
import * as auth from '../services/authService.js'
class RegisterForm extends Form {
  state = {
    data: { email: "", password: ""},
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token'])
      window.location ='/';
      
    } catch (ex) {
      if(ex.response && ex.response.status ===400){
        const errors ={...this.state.errors}
        errors.email = ex.response.data;
        this.setState({errors})
      
    }
  }
  
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
