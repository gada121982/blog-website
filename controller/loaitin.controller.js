var loaitin = require("../models/loaitin.model"); 
var theloai = require("../models/theloai.model"); 
const express = require('express'); 
const app   = new express();


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) ;// for parsing application/x-www-form-urlencoded


let data = [] ; 
theloai.find(null,'ten').exec((err,payload)=>{
    if(err) throw err
    else{
        data = payload ;
      
    }
}); 



module.exports.list  = (req,res)=>{

   
    loaitin.find().exec((err, value)=>{

       res.render("admin/typeNewsList",{
           dsloaitin : value ,
           succesful : 0
       });
        
    }); 
}
module.exports.add = (req,res)=>{

    
    res.render("admin/typeNewsAdd" ,{
        err : [1,1,1] , 
        succesful : 0 ,
        data : data 
    }); 
          
}

module.exports.addPost  = (req ,res)=>{
    
  
    let typeName    = req.body.typeName ; 
    let tenkhongdau = req.body.tenkhongdau ; 
    let tentheloai  = req.body.theloai ;
   
     //get date now 
    const date = new Date(); 
    const createAt = date.toLocaleString(); 
    const updateAt = date.toLocaleString(); 
     // Check error user
    let error = [1,1]; 
    let checkErr = 1; 
   
    

    if(!typeName){
        error[0] = 0; 
        checkErr = 0;   
    }
    if(!tenkhongdau){
        error[1] = 0 ; 
        checkErr = 0; 
    }

    if(checkErr === 0 ){
       
        res.render("admin/typeNewsAdd" , {
            err       : error ,
            succesful : 0, 
            data      : data
        });
    }
    else{
        
        const iLoaiTin = new loaitin({
            tentheloai : tentheloai,
            tenloaitin : typeName,
            tenkhongdau: tenkhongdau,
            createat   : createAt,
            updateat   : updateAt
        })
        
        iLoaiTin.save((err,value)=>{
            if(err) throw err ; 
            else{
                console.log(value); 
                res.render("admin/typeNewsAdd",{
                    succesful : 1 ,
                    err       : [1,1,1] ,
                    data      : data
                }); 
             }
        })
    }

}

module.exports.editGet  = (req,res)=>{

    let id = req.params.id ; 
   
    loaitin.findById(id).exec((err,payload)=>{
        if(err) throw err ; 
        else{
           
            res.render("admin/typeNewsEdit",{
                data      : payload , 
                err       : [1,1,1] , 
                succesful : 0 , 
                theloai   : data 

            });
        }
    });  
}

module.exports.editPost = async (req,res)=>{

    let id = req.params.id ;
    let tentheloai  = req.body.theloai ;
    let nameUpdate  = req.body.typeName ; 
    let tenkhongdau = req.body.tenkhongdau ; 

     //get date now 
     const date = new Date();   
     const updateAt = date.toLocaleString(); 
    // Check error user
    let error = [1,1]; 
    let checkErr = 1; 
    
    if(!nameUpdate){
        error[0] = 0; 
        checkErr = 0;   
  
    }
    if(!tenkhongdau){
        error[1] = 0 ; 
        checkErr = 0; 
    }
   
    if(checkErr === 0 ){
        loaitin.findOne({_id : id}).exec((err,payload)=>{
            if(err) throw err 
            else
            {   
                res.render("admin/typeNewsEdit" , {
                    err       : error ,
                    succesful : 0,
                    data      : payload, 
                    theloai   : data
                });
             
            }
           
        })
    }
    else{
            //? All succesful   
        await loaitin.findOneAndUpdate( {_id : id},
                                    {
                                        tentheloai  : tentheloai,
                                        tenloaitin  : nameUpdate,
                                        tenkhongdau : tenkhongdau,
                                        updateat    : updateAt 
        });

        await loaitin.findOne({_id : id}).exec((err,payload)=>{
            if(err) throw err 
            else
            {       
            
                res.render("admin/typeNewsEdit" , {
                    theloai   : data,
                    err       : error ,
                    succesful : 1,
                    data      : payload
                });
             
            }
        })
                                                             
    }                       
}
module.exports.delete  = async (req,res)=>{

    let id = req.params.id; 
    await loaitin.findOneAndDelete({ _id : id}); 

    loaitin.find().exec((err, value)=>{

        res.render("admin/typeNewsList",{
            dsloaitin : value ,
            succesful : 1
        });
         
     }); 
    
}