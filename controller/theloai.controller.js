const theloai = require("../models/theloai.model"); 
const express = require('express'); 
const app     = new express();

// Setup
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })) ;



module.exports.list  = (req,res)=>{

    theloai.find().exec((err, value)=>{

       res.render("admin/cateList",{
           dstheloai : value ,
           succesful : 0
       });
    }); 
}

module.exports.add = (req,res)=>{
    res.render("admin/cateAdd" ,{
        err : [1,1,1] , 
        succesful : 0
    });
}

module.exports.addPost  = (req ,res)=>{

        let cateName = req.body.cateName ; 
        let tenkhongdau = req.body.tenkhongdau ; 
        
         //get date now 
         
        const date = new Date(); 
        const createAt = date.toLocaleString(); 
        const updateAt = date.toLocaleString(); 
         // Check error user
        let error = [1,1]; 
        let checkErr = 1; 
       
        

        if(!cateName){
            error[0] = 0; 
            checkErr = 0;   
            console.log("co chay vao day");     
        }
        if(!tenkhongdau){
            error[1] = 0 ; 
            checkErr = 0; 
        }
    
        if(checkErr === 0 ){
            res.render("admin/cateAdd" , {
                err : error ,
                succesful : 0 
            });
        }
        else{
            
            const iTheLoai = new theloai({
                ten :         cateName,
                tenkhongdau : tenkhongdau,
                createAt :    createAt,
                updateAt :    updateAt
            })
            
            iTheLoai.save((err,value)=>{
                if(err) throw err ; 
                else{
                   
                    res.render("admin/cateAdd",{
                        succesful : 1 ,
                        err : [1,1,1] ,
                    }); 
                 }
            })
        }
   
}

module.exports.editGet  = (req,res)=>{

    let id = req.params.id ; 
    theloai.findById(id).exec((err,data)=>{
        if(err) throw err ; 
        else{
           
            res.render("admin/cateEdit",{
                data : data , 
                err : [1,1,1] , 
                succesful : 0 
            });
        }
    });  
}
module.exports.editPost = async (req,res)=>{

    let id = req.params.id ;

    let nameUpdate = req.body.cateName ; 
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
        theloai.findOne({_id : id}).exec((err,data)=>{
            if(err) throw err 
            else
            {   
            
                res.render("admin/cateEdit" , {
                    err : error ,
                    succesful : 0,
                    data : data
                });
             
            }
           
        })
       
    }
    else{
            //? All succesful   

        await theloai.findOneAndUpdate( {_id : id},
                                    {
                                        ten         : nameUpdate,
                                        tenkhongdau : tenkhongdau,
                                        updateAt    : updateAt 
        });

        
        await theloai.findOne({_id : id}).exec((err,data)=>{
            if(err) throw err 
            else
            {       
                res.render("admin/cateEdit" , {
                    err       : error ,
                    succesful : 1,
                    data      : data
                });
             
            }
           
        })
                                                             
    }                       
}

module.exports.delete  = async (req,res)=>{

    let id = req.params.id; 
    await theloai.findOneAndDelete({ _id : id}); 

    theloai.find().exec((err, value)=>{

        res.render("admin/cateList",{
            dstheloai : value ,
            succesful : 1
        });
         
     }); 
    
}