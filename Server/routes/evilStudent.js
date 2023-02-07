import _ from 'lodash'
import {checkingUser,checkingIsEvil} from "../utill/auth.js"
import express from 'express';
const router = express.Router();

import {EvilStudent, validate} from '../models/evilStudent.js'

router.use(checkingUser)
//router.use(checkingIsEvil)

router.get('/:id', async (req, res) => {
  const evilStudent = await EvilStudent.findById(req.params.id);

  if (!evilStudent) return res.status(404).send('The evilStudent with the given ID was not found.');

  res.send(evilStudent);
});

router.get('/', async (req, res) => {
    const evilStudents = await EvilStudent.find().sort('name');
    res.send(evilStudents);
  });

  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    //using findOne bc we are looking up based on a property, not id
    let evilStudent = await EvilStudent.findOne({ name: req.body.name });
    if (evilStudent) return res.status(400).send('evilStudent already registered.');
  
    evilStudent = new EvilStudent(_.pick(req.body, ['name','weapon', 'yourVictime','isEvil']));
    await evilStudent.save();
    res.send(evilStudent)
  
  });

  router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const evilStudent = await EvilStudent.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      weapon: req.body.weapon,
      yourVictime: req.body.yourVictime,
    },{new:true});

    if (!evilStudent) return res.status(404).send('The evilStudent with the given ID was not found.');

    res.send(evilStudent)
  }
  )
  router.delete('/:id', async (req, res) => {
    const evilStudent = await EvilStudent.findByIdAndRemove(req.params.id);
  
    if (!evilStudent) return res.status(404).send('The evilStudent with the given ID was not found.');
  
    res.send(evilStudent);
  });  
  export {router as evilStudentRouter};

  // AUTH and ADMIN
  /*router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });*/