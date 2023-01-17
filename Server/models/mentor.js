import Joi from'joi';
import mongoose from 'mongoose'


const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isEvil: Boolean
  ,  
});

const Mentor = mongoose.model("Mentor", mentorSchema);

  
function validateMentor(mentorSchema) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isEvil: Joi.boolean().required()

  });

  return schema.validate(mentorSchema);
}

export {Mentor, validateMentor as validate};