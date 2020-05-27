

var logginModel = require('../models/login.model'); 

module.exports.validate  = (req,res,next)=>{
    
     if(!req.cookies.validate){
          res.redirect('/admin/login');
          return ; 
     }
     
     var user = logginModel.findOne({_id:req.cookies.validate});
     
     if(!user){
          res.redirect('/admin/login');
          return ; 
     }
     next();

}
