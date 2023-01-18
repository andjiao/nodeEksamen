//import { Component } from 'react';
//import GoodStudents from './components/good/goodStudents';

//import axios from "axios";

//import apiUrl from "./config.json";
import GoodStudentsService from './services/goodStudentService';


//const apiEndpoint = apiUrl + "/goodStudents";

function App2(){
    return(
        <div className='App'>
            <GoodStudentsService/>

        </div>
    )
}
  

export default App2;