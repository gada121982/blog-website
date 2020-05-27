const tintuc     = require("../models/news.model"); 
const theloai    = require("../models/theloai.model"); 
const loaitin    = require("../models/loaitin.model"); 
const express    = require('express'); 
const bodyParser = require('body-parser')
const app        = new express();
const handleTLLT = require("../handlers/handleTLLT"); 
app.use(bodyParser.json());                          
app.use(bodyParser.urlencoded({ extended: false })) ;   


module.exports.baiviet = async (req,res)=>{

    
       
    arrayTL = await theloai.find(null,'ten'); 
    arrayTT = await loaitin.find(null, 'tenloaitin tentheloai tenkhongdau'); 
    var handleData = new handleTLLT(arrayTL , arrayTT) ; 
    arrayWasHandle = handleData.handleData(); 
    //NOTE  done find array of list beside nav 


    var allImportantNews = await tintuc.find({important : 1}); 
    var random = Math.random()*(allImportantNews.length-2); 
    var importantNews = allImportantNews.slice(random, random+3); 
   

    await tintuc.findOne({_id:req.params.id}).exec((err,data)=>{      
            if(err){
                res.send(err);
            }
            else if (data == null){
                res.render("main-views/indexpost",{
                    dataTinTuc : null , 
                    arrayTLLT     : arrayWasHandle ,
                    importantNews : importantNews 
                });
            }
            else
            {
                res.render("main-views/indexpost",{
                    dataTinTuc : data , 
                    arrayTLLT     : arrayWasHandle ,
                    importantNews : importantNews 
                });
            }
        
        }); 
}