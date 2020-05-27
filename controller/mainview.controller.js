
const tintuc     = require("../models/news.model"); 
const theloai    = require("../models/theloai.model"); 
const loaitin    = require("../models/loaitin.model"); 
const express    = require('express'); 
const bodyParser = require('body-parser')
const handleTLLT = require("../handlers/handleTLLT"); 
const chuanhoa   = require("../handlers/chuanhoastring.js"); 
const app        = new express();
const rp         = require('request-promise');
app.use(bodyParser.json());                          
app.use(bodyParser.urlencoded({ extended: false })) ;  





module.exports.trangchu = async (req,res)=>{
   
        
      
  
    arrayTL = await theloai.find(null,'ten'); 
    arrayTT = await loaitin.find(null, 'tenloaitin tentheloai tenkhongdau'); 
    var handleData = new handleTLLT(arrayTL , arrayTT) ; 
    arrayWasHandle = handleData.handleData(); 
    
    tintuc.find(null ,'_id, tieude , description , image , important , createat' ).exec( async (err,data)=>{
       
        var allImportantNews = []; 
       
        data.forEach(element => {
            if(element.important === 1){

                allImportantNews.push(element);

            }   
        });
        // take 3 important new radom  . 

        var random = Math.random()*(allImportantNews.length-2); 
        var importantNews = allImportantNews.slice(random, random+3); 
       
        var MainNews = data.slice(0,5) 
        var destData = [] ; 
        // get data from graph facebook. 
        for (var element of MainNews) {
            
            var options = {
                method: 'GET',
                uri: `https://graph.facebook.com/v3.0/?id=https://www.gadadev.tk/news/${element._id}`,
                qs: {
                    access_token: process.env.TOKEN,
                    fields: 'engagement',
                  
                },
                json: true
             }
            var dataFB = await rp(options) ; 
            var objectData = {
                data : element , 
                fb   : dataFB.engagement , 
            }
            destData.push(objectData); 
        }
        if(arrayWasHandle)
        {
           
            res.render("main-views/index",{
                dataTinTuc    : destData ,
                importantNews : importantNews ,
                arrayTLLT     : arrayWasHandle ,
                closeloadmore : false , 
                lengthSearch  : false, 
                keyWordSearch : ''

        });
        }else{
            res.send("reload plz");
        }
      

    }); 
    
} ; 
module.exports.getTypeNews =  async(req,res)=>{
    // gửi về những tin match tên tin tức trùng 
    // với tên không dấu trong req.params.tenkhongdau
        var  arrayTL = await theloai.find(null,'ten'); 
        var arrayTT = await loaitin.find(null, 'tenloaitin tentheloai tenkhongdau'); 
        var handleData = new handleTLLT(arrayTL , arrayTT) ; 
        var arrayWasHandle = handleData.handleData(); 
        var newimportant=  await tintuc.find({important:1});
  
        await  tintuc.find({loaitinkhongdau : req.params.loaitinkhongdau},'_id, tieude , description , image , important , createat').exec(async(err,data)=>{
            
                var allImportantNews = []; 
                // find all important news . 

                newimportant.forEach(element => {
                    if(element.important === 1){

                        allImportantNews.push(element);

                    }   
                });
                // take 3 important new radom  . 

                var random = Math.random()*(allImportantNews.length-2); 
                var importantNews = allImportantNews.slice(random, random+3); 
                
                var destData = [] ; 
                // get data from graph facebook. 
                for (var element of data) {
                    
                    var options = {
                        method: 'GET',
                        uri: `https://graph.facebook.com/v3.0/?id=https://www.gadadev.tk/news/${element._id}`,
                        qs: {
                            access_token: process.env.TOKEN,
                            fields: 'engagement',
                        
                        },
                        json: true
                    }
                    var dataFB = await rp(options) ; 
                    var objectData = {
                        data : element , 
                        fb   : dataFB.engagement , 
                    }
                    destData.push(objectData); 
                }
                res.render("main-views/index",{
                        dataTinTuc    : destData,
                        importantNews : importantNews ,
                        arrayTLLT     : arrayWasHandle ,
                        closeloadmore : true ,  
                        lengthSearch  : false, 
                        keyWordSearch : ''
                });



      })
    
}
module.exports.getNewsAjax = (req , res )=>{

    
    var page = parseInt(req.body.page);
   
    tintuc.find(null ,'_id, tieude , createat, description , image ,createat').skip(page).limit(5).exec(async (err,data)=>{
        var destData = [] ; 
        // get data from graph facebook. 
        console.log("this is data ajax ", data[0].createat , data[0]._id , data) ; 
        for (var element of data) {
            
            var options = {
                method: 'GET',
                uri: `https://graph.facebook.com/v3.0/?id=https://www.gadadev.tk/news/${element._id}`,
                qs: {
                    access_token: process.env.TOKEN,
                    fields: 'engagement',
                  
                },
                json: true
             }
            var dataFB = await rp(options) ; 
            var objectData = {
                data : element , 
                fb   : dataFB.engagement , 
            }
            destData.push(objectData); 
        }
        if(err){
          
            res.send(err) ; 
            
        }
        else{
            res.send(destData); 
        }
    }); 
    
}

module.exports.search = async(req,res)=>{

    arrayTL = await theloai.find(null,'ten'); 
    arrayTT = await loaitin.find(null, 'tenloaitin tentheloai tenkhongdau'); 
    var handleData = new handleTLLT(arrayTL , arrayTT) ; 
    arrayWasHandle = handleData.handleData(); 
    

    var regex = new RegExp(`${chuanhoa(req.query.q)}`,"g") ;  

    var completeTinTuc = [] ; 

    var newimportant=  await tintuc.find({important:1});
    await tintuc.find(null ,'_id, tieude , description , image , important , createat').exec(async(err,data)=>{

            if(err) {
                throw  new Error(err);
            }
            else{

                var allImportantNews = []; 
                // find all important news . 
                
                newimportant.forEach(element => {
                    if(element.important === 1){
        
                        allImportantNews.push(element);
        
                    }   
                });
                // take 3 important new radom  . 
        
                var random = Math.random()*(allImportantNews.length-2); 
                var importantNews = allImportantNews.slice(random, random+3); 
                

                data.forEach((element)=>{

                    if( regex.test(chuanhoa(element.tieude)) === true ||
                    regex.test(chuanhoa(element.description)) === true){
                        completeTinTuc.push(element); 
                    
                    }
                
                
                });
                
                var destData = [] ; 
                // get data from graph facebook. 
                for (var element of completeTinTuc){
                    
                    var options = {
                        method: 'GET',
                        uri: `https://graph.facebook.com/v3.0/?id=https://www.gadadev.tk/news/${element._id}`,
                        qs: {
                            access_token: process.env.TOKEN,
                            fields: 'engagement',
                        
                        },
                        json: true
                    }
                    var dataFB = await rp(options) ; 
                    var objectData = {
                        data : element , 
                        fb   : dataFB.engagement , 
                    }
                    destData.push(objectData); 
                }
                res.render("main-views/index",{
                    dataTinTuc    : destData,
                    importantNews : importantNews ,
                    arrayTLLT     : arrayWasHandle ,
                    closeloadmore : true ,  
                    lengthSearch  : completeTinTuc.length , 
                    keyWordSearch : req.query.q 
                }); 
            }
            
    }); 
  

  
}