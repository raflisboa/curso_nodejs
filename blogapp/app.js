//modules
const express = require ("express");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
// const mongoose = require("mongoose")

//config

//routes

//misc
const PORT = 8081
app.listen (PORT, () =>{
    console.log("Server is up")
})