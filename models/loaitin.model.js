var mongoose = require("mongoose"); 


var kittySchema = new mongoose.Schema(
    {
        tentheloai : String,
        tenloaitin : String,
        tenkhongdau: String,
        createat   : String,
        updateat   : String
    }
)

kitten = mongoose.model('type', kittySchema ,'type'); 

module.exports = kitten ; 