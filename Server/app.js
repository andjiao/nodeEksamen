import mongoose from 'mongoose'
import bodyParser from "body-parser"

import express from "express";
const app = express();

import { userRouter } from './routes/user.js';
import {evilStudentRouter} from './routes/evilStudent.js'
import { goodStudentRouter } from './routes/goodStudent.js';


app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const url = `mongodb+srv://andjiao:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.rujjilh.mongodb.net/GoodAndEvil`;
 
mongoose.set('strictQuery', true);
mongoose.connect(url)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))

app.use('/api/users', userRouter);
app.use('/api/goodStudents', goodStudentRouter);
app.use('/api/evilStudents', evilStudentRouter);


const PORT = process.env.PORT || 8080;

const server =app.listen(PORT,(error)=>
{
if(error){
    console.log(error);
}
console.log("Server is running on port", server.address().port)
});