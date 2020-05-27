var mongoose = require("mongoose"); 


var kittySchema = new mongoose.Schema(
    {
        
        ten: String,
        tenkhongdau : String,
        createAt : String,
        updateAt : String
    }
)

kitten = mongoose.model('TheLoai', kittySchema ,'TheLoai'); 

module.exports = kitten ; 