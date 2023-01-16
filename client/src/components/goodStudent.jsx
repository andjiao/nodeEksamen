import React from "react";
import Joi from "joi-browser";
import Form from './reUseable/form'

class goodStudentForm extends Form {
    state = {
        data:{
            name:'',
            abilities:'',
            whoToHelp:'',
            isEvil:''

        }
      } 

      schema = {
        name:Joi.string().min(2).max(50).required(),
        abilities:Joi.string().min(2).max(1024).required(),
        whoToHelp:Joi.string().min(2).max(1024).required(),
        isEvil: Joi.boolean()
      };

    
      componentDidMount(){
          const goodStudentId = this.props.match.id;
          if(goodStudentId ==='new') return;

          const goodStudent = getGoodStudent(goodStudentId);
          if(!goodStudent) return this.props.history.replace("/not-found")

          this.setState({data: this.mapToViewGoodStudent});
      }

      mapToViewGoodStudent(goodStudent){
          return{
              _id: goodStudent._id,
              name:goodStudent.name,
              abilities: goodStudent.abilities,
              whoToHelp:goodStudent.whoToHelp,
              isEvil:goodStudent.isEvil    
          }
      }

      doSubmit =()=>{
          saveGoodStudent(this.state.data);
          this.props.history.push("/goodStudents")
      }
    render() { 
        return (
            <div>
            <h1>Become Good Form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('name','Name')}
                {this.renderInput('abilities','Abilities')}
                {this.renderInput('whoToHelpt','Who do you want to help?')}
                {this.renderInput('isEvil',' you are one of the good ones')}
                {this.renderButton("Save")}
            </form>

            </div>
           
        );
    }
}
 
export default goodStudentForm;

