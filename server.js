const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");


//app creates server
const app = express();
//sets view engine to handlebars
app.use(express.static(__dirname + "/public"));
app.set("view-engine", "hbs");

// connecting to our mongodb server
//Promise Library
mongoose.Promise = global.Promise;

//connect to the database
mongoose.connect("mongodb://root:zach0321@ds133262.mlab.com:33262/fourfun", {
    useNewUrlParser: true 
});

app.use(require("./controllers"))

app.listen(process.env.PORT || 3000,()=>{
    console.log("Listening to port 3000")
});

/**************************************************************************************/