import "dotenv/config";
import bcrypt from 'bcrypt'
import _ from 'lodash'

import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import { User, validate} from "../models/user.js";

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/signup', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //using findOne bc we are looking up based on a property, not id
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['email', 'password', 'isEvil']));
  const salt = await bcrypt.genSalt(10);
  //user.password is the plain text we get from the user, whn they enter their password
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
  .header('x-auth-token', token)
  .header("access-control-expose-headers", "x-auth-token")
  .send(_.pick(user, ['_id','email', 'isEvil']));
});

router.delete('/:id',[auth], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

export {router as userRouter};
