import Joi from'joi';
import mongoose from 'mongoose'

/* IF time, add pet*/

const goodStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true
  },
  abilities: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  whoToHelp: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024
  },
  isEvil:{
    type: Boolean,
    default: false
  }
});

const GoodStudent = mongoose.model("GoodStudent", goodStudentSchema);

function validateGoodStudent(goodStudentSchema) {
  const schema = Joi.object({
    name:Joi.string().min(2).max(50).required(),
    abilities:Joi.string().min(2).max(1024).required(),
    whoToHelp:Joi.string().min(2).max(1024).required(),
    isEvil: Joi.boolean()
  });

  return schema.validate(goodStudentSchema);
}

export {GoodStudent, validateGoodStudent as validate};


