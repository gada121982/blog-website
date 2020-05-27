

const express = require('express'); 
const app     = new express();
const theloai   = require("../controller/theloai.controller"); 

// Setup 
app.use(express.json());
app.use(express.urlencoded({ extended: true })) ;
app.use(express.static('public'));




app.get('/', theloai.list); 

// Edit 
app.get('/edit/:id', theloai.editGet);
app.post('/edit/:id', theloai.editPost);

// Add
app.get('/add', theloai.add); 
app.post('/add', theloai.addPost);

//Delete
app.get('/delete/:id', theloai.delete); 

module.exports = app ; 