import axios from "axios";
import jwtDecode from 'jwt-decode';
import apiUrl from "../config.json";
import { setJwt } from "./httpService";

const apiEndpoint = apiUrl + "/users";
const tokenKey ="token"

setJwt(getJwt())

async function login(emial, password){
    const {data:jwt} = await axios.post(apiEndpoint,{emial,password})
    localStorage.setItem(tokenKey,jwt);
}

function loginWithJwt(jwt){
    localStorage.setItem(tokenKey,jwt)

}

function logout(){
    localStorage.removeItem(tokenKey)
}

function getCurrentUser(){
    try {
        const jwt = localStorage.getItem(tokenKey)
        return jwtDecode(jwt);
          
      } catch (ex) {
          return null;
        
      }
}

function getJwt(){
    return localStorage.getItem(tokenKey);
}

export { login,logout, getCurrentUser, loginWithJwt, getJwt};
