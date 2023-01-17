import React from "react";
import Joi from "joi-browser";
import Form from '../reUseable/form'
import {/*getGoodStudents*/ getGoodStudent, saveGoodStudent, /*deleteGoodStudent*/} from '../../services/goodStudentService.js';

class GoodStudentForm extends Form {
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

      async populateGoodStudent() {
        try {
          const goodStudentId = this.props.match.params.id;
          if (goodStudentId === "new") return;
    
          const { data: goodStudent } = await getGoodStudent(goodStudentId);
          this.setState({ data: this.mapToViewModel(goodStudent) });
        } catch (ex) {
          if (ex.response && ex.response.status === 404)
            this.props.history.replace("/not-found");
        }
      }


      async componentDidMount(){
          await this.populateGoodStudent();
      }

      mapToViewModel(goodStudent){
          return{
              _id: goodStudent._id,
              name:goodStudent.name,
              abilities: goodStudent.abilities,
              whoToHelp:goodStudent.whoToHelp,
              isEvil:goodStudent.isEvil    
          }
      }

  doSubmit = async () => {
    await saveGoodStudent(this.state.data);

    this.props.history.push("/goodStudent");
  };

    render() { 
        return (
            <div>
            <h1>Become Good Form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('name','Name')}
                {this.renderInput('abilities','Abilities')}
                {this.renderInput('whoToHelpt','Who do you want to help?')}
                <h3>you are one of the good ones</h3>
                {this.renderButton("Save")}
            </form>
            </div>
           
        );
    }
}
 
export default GoodStudentForm;
