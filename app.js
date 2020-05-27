
const express    = require("express"); 
const mongoose   = require("mongoose"); 
const app        = express() ; 
const bodyParser = require('body-parser');

require("dotenv").config(); 
    // Import routes                                               
const theloai  = require("./routes/theloai.routes"); 
const loaitin  = require("./routes/loaitin.routes");
const tintuc   = require("./routes/news.routes"); 
const mainview = require("./routes/mainview.routes.js"); 
const mainPost = require("./routes/main-post.routes.js");
const Login    = require("./routes/login.routes.js"); 
const cookieParser = require('cookie-parser');
const validateAdmin = require("./middlewares/login.validate.js"); 

    // connect database . 
mongoose.connect('mongodb+srv://vinhhai:121983@vinhhai-kierm.mongodb.net/blog?retryWrites=true&w=majority', {useNewUrlParser: true});


    // Setup express
app.set("view engine", 'ejs') ; 
app.set('views', './views');
app.use(bodyParser.json());                          
app.use(bodyParser.urlencoded({ extended: true })) ;   
app.use(express.static('public')) ; 
app.use(cookieParser())
    // use routes
app.use("/", mainview);
app.use("/news",mainPost );
app.use("/admin/loaitin",validateAdmin.validate, loaitin);
app.use("/admin/theloai",validateAdmin.validate, theloai); 
app.use("/admin/tintuc",validateAdmin.validate, tintuc);
app.use("/admin/login",Login);


app.listen( process.env.PORT || 3000, () => {
    console.log(`Server started on port ${3000}`);
});
