import Joi from'joi';
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isEvil:{
    type: Boolean,
    default:false,
    required: false,
  } 
});


const User = mongoose.model("User", userSchema);


function validateUser(userSchema) {
  const schema = Joi.object({
    name:Joi.string().min(2).max(255),
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(255).required(),
    isEvil:Joi.boolean(),
  });

  return schema.validate(userSchema);
}

export {User, validateUser as validate};


