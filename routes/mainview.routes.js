
const express = require('express');
const app     = new express();
const mainview = require("../controller/mainview.controller"); 



    // Setup
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })) ;
app.use(express.static('public'));


app.get('/', mainview.trangchu);

app.get('/search',mainview.search);
app.get('/:loaitinkhongdau', mainview.getTypeNews);
app.post("/getNewsAjax", mainview.getNewsAjax); 

module.exports = app ; 