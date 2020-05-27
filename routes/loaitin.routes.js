
const express = require('express');
const app     = new express();
const loaitin = require("../controller/loaitin.controller"); 


    // Setup
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })) ;
app.use(express.static('public'));



    // main routes

app.get('/', loaitin.list); 
//Add
app.get('/add', loaitin.add); 
app.post('/add', loaitin.addPost);

// Edit 
app.get('/edit/:id', loaitin.editGet);
app.post('/edit/:id', loaitin.editPost);



//Delete
app.get('/delete/:id', loaitin.delete); 

module.exports = app ; 