import Joi from'joi';
import mongoose from 'mongoose'

/* IF time, add pet */

const evilStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true
  },
  weapon: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  yourVictime: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024
  },
  isEvil:{
    type: Boolean,
    default: true
  }
});

const EvilStudent = mongoose.model("EvilStudent", evilStudentSchema);

function validateEvilStudent(evilStudentSchema) {
  const schema = Joi.object({
    name:Joi.string().min(2).max(50).required(),
    weapon:Joi.string().min(2).max(255).required(),
    yourVictime:Joi.string().min(2).max(255).required(),
    isEvil: Joi.boolean()
  });

  return schema.validate(evilStudentSchema);
}

export {EvilStudent, validateEvilStudent as validate};


