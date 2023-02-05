import _ from 'lodash'

import * as dotenv from 'dotenv' 
dotenv.config();

import express from 'express';
const router = express.Router();

import { User, validate } from "../models/user.js";
import { comparePassword, hashingPassword } from '../utill/passwordSecurity.js';


router.post('/signin', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let newUser = await User.findOne({ email: req.body.email });
  if (newUser) return res.status(400).send('User already registered.');
  
  newUser = new User(_.pick(req.body, ['name','email','password']));
  newUser.password = await hashingPassword(req.body.password);
  
  await newUser.save();
  res.send(newUser)
})



router.post('/login', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    const validatePassword = await comparePassword(req.body.password, user.password);

    if (!user || !validatePassword) {
      return res.status(400).send({message: 'Invalid email or password.'})
    }else{
      req.session.isLoggedIn === true
      req.session.userid = user._id
      
      if (user.admin === true) {
        res.status(200).send({ data: {id: user.id, email: user.email, isAdmin: !!user.isAdmin } })
        return
            }
          res.status(200).send({ data: {id: user.id, email: user.email, isAdmin: !!user.isAdmin}})
        }
    } catch (error) {
      console.log(error)
    
      res.status(500).send({ message: "Server error." })
    }


  });


router.post("/logout", (req, res) => {
  try {
      req.session.destroy()
      res.send({ message: "Logged out." })    
  } catch {
      res.status(500).send("Server error")
  }
})


router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const user = await user.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
  });

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user)
}
)

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove([req.params.id]);

  if (!user) 
  return res.status(404).send('The user with the given ID was not found.');


  res.send(user);
});

export {router as userRouter};
