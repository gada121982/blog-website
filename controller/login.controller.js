
var logginModel = require('../models/login.model'); 

const express = require('express'); 
const app   = new express();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })) ;




module.exports.login = (req,res)=>{

    res.render("admin/login", {
        err : undefined
    });
}
module.exports.loginPost = (req,res)=>{

    var username = req.body.email ; 
    var pwd      = req.body.password; 
    
   
    if(!username || !pwd){
        res.render('admin/login',{
            err: 'Nhập đầy đủ các input'
        });
    }
    logginModel.find().exec((err,data)=>{
      
       
        if(err) {
            return ; 
        }
        if(data[0].email == username && data[0].password == pwd){
             res.cookie('validate',data[0]._id);
             res.redirect('/admin/theloai');
        }else{
            res.render('admin/login',{
                err: 'Sai thông tin tài khoản' 
            });
        }

    });
    


}
