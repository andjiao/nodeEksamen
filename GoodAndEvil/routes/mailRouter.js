import { Router } from "express";

const router = Router();

import { sendMail } from "../"

router.post('/send',(req,res)=>{
  let mailOptions = {
    from: req.body.email, // sender address
    to: 'adrian.ullrich@ethereal.email', // list of receivers
    subject: 'Contact form', // Subject line
    text: req.body.wishes, // plain text body
};
    sendMail(mailOptions)
    res.send("you mail will asap")
})