var mongoose = require("mongoose"); 


var kittySchema = new mongoose.Schema(
    {
        "tieude"         : String,
        "tieudekhongdau" : String,
        "description"    : String,
        "content"        : String,
        "image"          : String,
        "important"      : Number,
        "countview"      : Number,
        "countcomment"   : Number,
        "countlike"      : Number,
        "loaitin"        : String,
        "loaitinkhongdau": String,
        "createat"       : String,  
        "updateat"       : String
        
    }
)

kitten = mongoose.model('news', kittySchema ,'news'); 

module.exports = kitten ; 