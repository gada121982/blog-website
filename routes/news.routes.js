const express = require("express"); 
const app     = express(); 
const tintuc = require("../controller/news.controller"); 

//setup

app.use(express.json());
app.use(express.urlencoded({ extended: true })) ;
app.use(express.static('public'));


// main routes

app.get('/',tintuc.list); 

// add news
app.get('/add',tintuc.getAdd) ;
app.post('/add',tintuc.postAdd); 


// ajax
app.post('/getLoaiTin', tintuc.getAjaxLoaiTin);

// delete 
app.get('/delete/:id', tintuc.delete);

module.exports = app ; 