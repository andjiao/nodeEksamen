/* 

create -router.post
update - router.
delete router.delete
showEvil router.get
getAllEvilsFromDB. router.getAll


const battleResults = [];

router.get("/api/battles", (req, res) => {
    res.send({ data: battleResults });
});

router.post("/api/battles", (req, res) => {
    battleResults.push(req.body);
    res.send({ message: "Results received" });
});

export default {
    router,
    battleResults
};

*/

import { Router } from "express";

const router = Router();

router.post('/api/createEvil',(req,res) =>{
    res.send(req.body);
})

