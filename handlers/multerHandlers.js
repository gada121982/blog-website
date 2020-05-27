const multer     = require('multer'); 
const path       = require('path'); 
const storage    = multer.diskStorage({
    filename    : function(req , file , cb){
        cb(null,file.fieldname +"-"+Date.now()+
            path.extname(file.originalname)); 
    }

})

const upload  = multer({
     storage    : storage ,
     limits     : { fileSize : 1000000 },
     fileFilter : function(req,file,cb){
         checkFileType(file, cb) ;
     }
}).single("image"); 

// check file extension . 
function checkFileType(file, cb){

    // allowed extension. 
    const filetypes = /jpeg|jpg|png|gif|svg/; 
    // check ex
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) ; 

    // check mime .
    const mimeType = filetypes.test(file.mimetype); 

    if(extname && mimeType ){
        return cb(null,true); 
    }
    else{
        cb('Error: Images only');
    }
}

module.exports = upload ; 
