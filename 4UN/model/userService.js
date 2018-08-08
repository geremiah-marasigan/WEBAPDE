const mongoose = require("mongoose");
var User = require("mongoose").model("User")
var UserSchema = User.schema

function getAll(){
    var Users = User.find().then((users)=>{
        return users
    },(err)=>{
        return false  
    });
}

//Get the memes uploaded by a specific user
function getMemes(){
    
}