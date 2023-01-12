
import _ from 'lodash'

import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js'
import isGoodUser from '../middleware/isGood.js'
import {GoodStudent,validate} from '../models/goodStudent.js'

/*router.use(auth)
router.use(isGoodUser)*/

router.get('/:id', async (req, res) => {
  const goodStudent = await GoodStudent.findById(req.params.id);

  if (!goodStudent) return res.status(404).send('The goodStudent with the given ID was not found.');

  res.send(goodStudent);
});

router.get('/', async (req, res) => {
    const goodStudents = await GoodStudent.find().sort('name');
    res.send(goodStudents);
  });


  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    //using findOne bc we are looking up based on a property, not id
    let goodStudent = await GoodStudent.findOne({ name: req.body.name });
    if (goodStudent) return res.status(400).send('goodStudent already registered.');
  
    goodStudent = new GoodStudent(_.pick(req.body, ['name','abilities', 'whoToHelp','isEvil']));
    await goodStudent.save();
    res.send(goodStudent)
  
  });

  router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const goodStudent = await GoodStudent.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      abilities: req.body.abilities,
      whoToHelp: req.body.whoToHelp,
    },{new:true});

    if (!goodStudent) return res.status(404).send('The goodStudent with the given ID was not found.');

    res.send(goodStudent)
  }
  )

  router.delete('/:id', async (req, res) => {
    const goodStudent = await GoodStudent.findByIdAndRemove(req.params.id);
  
    if (!goodStudent) return res.status(404).send('The goodStudent with the given ID was not found.');
  
    res.send(goodStudent);
  });
  
  export {router as goodStudentRouter};