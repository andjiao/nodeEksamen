<script>
import express from "express";
const app = express();

//authentication: erkender dig selv
//authensentatation: vurderer hvilken rolle man er of hvor meget adgang man har til ressourcer

import bodyParser from "body-parser"

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

 import evilProfileRouter from "./routes/evilProfileRouter.js";

</script>

<main>
 
</main>

<style>

  
</style>
