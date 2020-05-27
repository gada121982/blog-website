
const express = require('express');
const app     = new express();
const LoginCT = require("../controller/login.controller");

    // Setup
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })) ;
app.use(express.static('public'));


app.get('/',LoginCT.login ); 
app.post('/', LoginCT.loginPost);

module.exports = app ; 