var mongoose = require("mongoose"); 


var kittySchema = new mongoose.Schema(
    {
        email    : String,
        password : String,
      
    }
)

kitten = mongoose.model('account', kittySchema ,'account'); 

module.exports = kitten ; 