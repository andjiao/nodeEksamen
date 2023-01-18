import { Component } from "react";
import { getEvilStudents } from "../../services/evilStudentService";

class EvilStudents extends Component {
  state = { 
    evilStudents:getEvilStudents()
   } ;

  render() { 
    const {length: count }= this.state.evilStudents;

    if(count === 0) return <p>There are no Evil students in the school</p>;
    return (
      <>

name:'',
            abilities:'',
            whoToHelp:'',
            isEvil:''
      <p>Showing {count} evil students goes in this school</p>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Abilities</th>
            <th>who the student is helping</th>
          </tr>
        </thead>

        <tbody>
          {this.state.evilStudents.map(evilStudent=>(
            <tr key={evilStudent._id}>
              <td>{evilStudent.name}</td>
              <td>{evilStudent.abilities}</td>
              <td>{evilStudent.whoToHelp}</td>
              <td>{evilStudent.isEvil}</td>
            </tr>
          ))}
        </tbody>

      </table>
      </>
    );
  }
}
 
export default EvilStudents;