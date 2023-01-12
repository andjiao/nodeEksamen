import jwt from 'jsonwebtoken'
import Joi from'joi';
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
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
    required: true
  } 
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.jwtPrivateKey);
  return token;
}

const User = mongoose.model("User", userSchema);


function validateUser(userSchema) {
  const schema = Joi.object({
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(255).required(),
    isEvil: Joi.boolean().required()
  });

  return schema.validate(userSchema);
}

export {User, validateUser as validate};


