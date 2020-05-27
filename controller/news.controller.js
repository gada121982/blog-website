const loaitin = require("../models/loaitin.model"); 
const theloai = require("../models/theloai.model");
const tintuc  = require("../models/news.model");
const express = require('express'); 
const bodyParser = require('body-parser')
const app   = new express();
const upload = require("../handlers/multerHandlers.js"); 
const cloudinary = require("../handlers/cloudinary.js"); 
const chuanhoa = require("../handlers/chuanhoastring.js"); 

app.use(bodyParser.json());                          
app.use(bodyParser.urlencoded({ extended: false })) ;   


// get data collection loaitin and theloai .


module.exports.list = (req,res)=>{

    tintuc.find().exec((err,payload)=>{
        res.render("admin/newsList",{
            dstintuc : payload 
        });
    }); 
  

}

module.exports.getAdd = async (req,res)=>{

    let dataLoaitin = [];
    let dataTheloai = [];

    await loaitin.find(null,'tenloaitin').exec((err,data)=>{
        if(err) return  ;
        dataLoaiTin = data ;
      
    });

    await theloai.find(null,'ten').exec((err,data)=>{
        if(err) return  ;
        dataTheloai = data ; 
        res.render("admin/newsAdd",{
            dataTheLoai : dataTheloai ,
            dataLoaiTin : dataLoaitin , 
            succesful   : 0 
        })
    }); 
    
     
    
}
module.exports.postAdd = async (req,res)=>{

    
    console.log("o day ne "); 
   
  
    upload(req,res,async (err)=>{   
        if(err){
           
        }
        else{
            if(req.file == undefined){
                // make sure user don't select anything. 
            }
            else{
                const result = await cloudinary.v2.uploader.upload(req.file.path);
                const date = new Date();
                var createAt = date.toLocaleString(); 
                var updateAt = date.toLocaleString(); 
                var loaitinkhongdau = chuanhoa(req.body.loaitin); 
                console.log("loai tin khong dau", loaitinkhongdau); 
                const iNews = new tintuc({
                    tieude         : req.body.tieude,
                    tieudekhongdau : req.body.tieudekhongdau,
                    description    : req.body.description,
                    content        : req.body.content,
                    image          : result.url,
                    important      : req.body.important, 
                    loaitin        : req.body.loaitin,
                    loaitinkhongdau: loaitinkhongdau,
                    createat       : createAt,
                    updateat       : updateAt
                })
                let dataLoaitin = [];
                let dataTheloai = [];
                console.log("1"); 

                await loaitin.find(null,'tenloaitin').exec((err,data)=>{
                    if(err) return  ;
                    dataLoaiTin = data ;
                    console.log("2"); 
                
                });

                await theloai.find(null,'ten').exec((err,data)=>{
                    if(err) return  ;
                    dataTheloai = data ; 

                    iNews.save((err,data)=>{
                        if(err){
                            res.send(err);
                        }
                        else{
                            console.log("3"); 
                            res.render("admin/newsAdd",{
                                succesful : 1 , 
                                dataTheLoai : dataTheloai ,
                                dataLoaiTin : dataLoaitin 
                            });
                        }
                    })
                
                }); 
                
            }
           
           
        }
    }); 
}


module.exports.getAjaxLoaiTin = async (req,res)=>{

    
    console.log("this is data", req.body.data); 
    loaitin.find({tentheloai : `${req.body.data}`},'tenloaitin').exec((err,data)=>{
        if(err) throw new Error(err)
        else{
        
        console.log("this is data find ", data); 
         res.send(data);
        }
     });

    
}

// delete 
module.exports.delete = async(req,res)=>{

    let id = req.params.id; 
    await tintuc.findOneAndDelete({ _id : id}); 

    tintuc.find().exec((err, value)=>{

        res.render("admin/newsList",{
                dstintuc : value ,
                succesful : 1
        });
            
     }); 
}