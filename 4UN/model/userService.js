const mongoose = require("mongoose");
var User = require("mongoose").model("User")
var UserSchema = User.schema

function getAll(){
    var Users = User.find().then((users)=>{
        console.log("User get success")
        return users
    },(err)=>{
        return false  
    });
}

////Find specific user given his username
function findSpecific(query){
    User.findOne({"username": query}).then((user)=>{
        console.log("User " + query + " Found")
        return user
    }, (err)=>{
        console.log("User not found")
        return false
    })
}

//Get the memes uploaded by a specific user
function getMemes(user){
    return user.posts
}