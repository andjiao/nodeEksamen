import React from "react";
import Joi from "joi-browser";
import Form from './reUseable/form'

class evilStudentForm extends Form {
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
        weapon:Joi.string().min(2).max(1024).required(),
        yourVictime:Joi.string().min(2).max(1024).required(),
        isEvil: Joi.boolean()
      };

      

    
      componentDidMount(){
          const evilStudentId = this.props.match.id;
          if(evilStudentId ==='new') return;

          const evilStudent = getEvilStudent(evilStudentId);
          if(!evilStudent) return this.props.history.replace("/not-found")

          this.setState({data: this.mapToViewEvilStudent});
      }

      mapToViewEvilStudent(evilStudent){
          return{
              _id: evilStudent._id,
              name:evilStudent.name,
              weapon: evilStudent.weapon,
              yourVictime:evilStudent.yourVictime,
              isEvil:evilStudent.isEvil    
          }
      }

      doSubmit =()=>{
          saveEvilStudent(this.state.data);
          this.props.history.push("/evilStudents")
      }
    render() { 
        return (
            <div>
            <h1>Become Evil Form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('name','Name')}
                {this.renderInput('weapon','Weapon')}
                {this.renderInput('yourVictime','Who should suffer?')}
                {this.renderInput('isEvil',' welcome to the dark side')}
                {this.renderButton("Save")}
            </form>

            </div>
           
        );
    }
}
 
export default evilStudentForm;

