import "dotenv/config";
import _ from 'lodash'
import { Mentor, validate} from "../models/mentor.js";
import express from 'express';
const router = express.Router();

router.get('/:id', async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (!mentor) return res.status(404).send('The mentor with the given ID was not found.');

  res.send(mentor);
});

router.get('/', async (req, res) => {
    const mentors = await Mentor.find().sort('name');
    res.send(mentors);
  });

  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    //using findOne bc we are looking up based on a property, not id
    let mentor = await Mentor.findOne({ name: req.body.name });
    if (mentor) return res.status(400).send('Mentor already registered.');
  
    mentor = new Mentor(_.pick(req.body, ['name', 'isEvil']));
    await mentor.save();

    res.send(mentor)
  
  });

  router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const mentor = await Mentor.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      isEvil: req.body.isEvil
    },{new:true});

    if (!mentor) return res.status(404).send('The mentor with the given ID was not found.');

    res.send(mentor)
  }
  )

  router.delete('/:id', async (req, res) => {
    const mentor = await Mentor.findByIdAndRemove(req.params.id);
  
    if (!mentor) return res.status(404).send('The mentor with the given ID was not found.');
  
    res.send(mentor);
  });
    
  export {router as mentorRouter};