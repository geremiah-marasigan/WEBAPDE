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

//Find specific user
function findSpecific()

//Get the memes uploaded by a specific user
function getMemes(user){
    User.findOne("owner" : user.username)
}