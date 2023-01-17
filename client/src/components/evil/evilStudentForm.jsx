import React from "react";
import Joi from "joi-browser";
import Form from '../reUseable/form'
import {/*getEvilStudents*/ getEvilStudent, saveEvilStudent, /*deleteEvilStudent*/} from '../../services/evilStudentService.js';

class EvilStudentForm extends Form {
    state = {
        data:{
            name:'',
            weapon:'',
            yourVictime:'',
            isEvil:''

        }
      } 
  schema = {
    name:Joi.string().min(2).max(50).required(),
    weapon:Joi.string().min(2).max(255).required(),
    yourVictime:Joi.string().min(2).max(255).required(),
    isEvil: Joi.boolean()
  };

      async populateEvilStudent() {
        try {
          const evilStudentId = this.props.match.params.id;
          if (evilStudentId === "new") return;
    
          const { data: evilStudent } = await getEvilStudent(evilStudentId);
          this.setState({ data: this.mapToViewModel(evilStudent) });
        } catch (ex) {
          if (ex.response && ex.response.status === 404)
            this.props.history.replace("/not-found");
        }
      }


      async componentDidMount(){
          await this.populateEvilStudent();
      }

      mapToViewModel(evilStudent){
          return{
              _id: evilStudent._id,
              name:evilStudent.name,
              abilities: evilStudent.weapon,
              whoToHelp:evilStudent.yourVictime,
              isEvil:evilStudent.isEvil    
          }
      }

  doSubmit = async () => {
    await saveEvilStudent(this.state.data);

    this.props.history.push("/evilStudent");
  };

    render() { 
        return (
            <div>
            <h1>Become Evil Form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('name','Name')}
                {this.renderInput('weapon','Weapon')}
                {this.renderInput('yourVictime','Who should suffer?')}
                <h3>Welcome to the dark side</h3>
                {this.renderButton("Save")}

            </form>
            </div>
           
        );
    }
}
 
export default EvilStudentForm;
