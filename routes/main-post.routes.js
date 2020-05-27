

const express = require('express');
const app     = new express();
const mainpost = require("../controller/main-post.controller"); 

    // Setup
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })) ;
app.use(express.static('public'));



app.get('/:id',mainpost.baiviet) ;

module.exports = app ; 