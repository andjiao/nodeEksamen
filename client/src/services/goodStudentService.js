import React, { useEffect, useState } from "react";
import axios from "axios";

//import apiUrl from "../config.json";

//const apiEndpoint = apiUrl + "/goodStudents";

class GoodStudentService extends Component {
  
  function GoodStudentsService= ()=> {
    const [goodStudents,setGoodStudents] = useState([])
  
    useEffect(()=>{
      axios.get('http://localhost:8080/api/goodStudents')
      .then(res=>{
        setGoodStudents(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },[])
    return(
      <table className="table">
      <thead>
        <tr>
        <th>Name</th>
          <th>Abilities</th>
          <th>who the student is helping</th>
        </tr>
      </thead>
      <tbody>
            {goodStudents.map(goodStudent =>
            <tr key={goodStudent._id}>
            <td>{goodStudent.name}</td>
            <td>{goodStudent.abilities}</td>
            <td>{goodStudent.whoToHelp}</td>
            <td>{goodStudent.isEvil}</td>
          </tr> )}
          </tbody>
        </table>
    )
  
    }


 
export default GoodStudentService;




/* import axios from "axios";
import apiUrl from "../config.json";
import Table from '../components/reUseable/table';

const apiEndpoint = apiUrl + "/goodStudents";

function goodStudentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

componnentDidMount(){
  const response = await axios.get(apiEndpoint)
  
}
async function getGoodStudents() {
  return await axios.get(apiEndpoint);
}

function getGoodStudent(goodStudentId) {
  return axios.get(goodStudentUrl(goodStudentId));
}

function saveGoodStudent(goodStudent) {
  if (goodStudent._id) {
    const body = { ...goodStudent };
    delete body._id;
    return axios.put(goodStudentUrl(goodStudent._id), body);
  }

  return axios.post(apiEndpoint, goodStudent);
}

function deleteGoodStudent(goodStudentId) {
  return axios.delete(goodStudentUrl(goodStudentId));
}

export{getGoodStudents, getGoodStudent, saveGoodStudent, deleteGoodStudent};
 */