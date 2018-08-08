const mongoose = require("mongoose");
var User = require("mongoose").model("User")
var UserSchema = User.schema

//Going to use Mongoose Queries, to be called in server by exec() function
function getAll(){
    var query = User.find()
    
    return query
}

//Find specific user given his username, to be used when you click a users name from a meme since meme only stores his username
//Also used in authentication
function findSpecific(user){
    var query = User.findOne({"username": user})/*.then((user)=>{
        console.log("User " + query + " Found")
        return user
    }, (err)=>{
        console.log("User not found")
        return false
    })*/
    return query
}

//Get the memes uploaded by a specific user, for profile page
//only shows latest 12 memes
function getMemes(user){
    var query = User.findOne({username : user}, {posts: 1}).sort({_id:-1}).limit(12)
    return query
}

//Get the memes shared to a specific user, for profile page
//only shows latest 12 memes
function sharedMemes(user){
    var query = User.findOne({username : user}, {shared: 1}).sort({_id:-1}).limit(12)
    return query
}