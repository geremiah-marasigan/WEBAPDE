const mongoose = require("mongoose");

var exports = module.exports = {};


var User = require("mongoose").model("User")
var UserSchema = User.schema

//Going to use Mongoose Queries, to be called in server by exec() function
exports.getAll = function(){
    var query = User.find()
    
    return query
}

//Find specific user given his username, to be used when you click a users name from a meme since meme only stores his username
//Also used in authentication
exports.findSpecific = function (user){
    var query = User.findOne({"username": user})/*.then((user)=>{
        console.log("User " + query + " Found")
        return user
    }, (err)=>{
        console.log("User not found")
        return false
    })*/
    return query
}

exports.getHashedPasword = function(user){
    var query = User.findOne({"username": user}, {password: 1})
    return query
}

//Get the memes uploaded by a specific user, for profile page
//only shows latest 12 memes
exports.getMemes = function(user){
    var query = User.findOne({username : user}, {posts: 1}).sort({_id:-1}).limit(12)
    return query
}

//Get the memes shared to a specific user, for profile page
//only shows latest 12 memes
exports.sharedMemes = function(user){
    var query = User.findOne({username : user}, {shared: 1}).sort({_id:-1}).limit(12)
    return query
}

exports.removedShared = function(user, meme){
    var query = User.findOne({username : user}).update({}, {$pull: {shared: meme}}, {multi: true})
    return query
}

exports.updateShared = function(user, meme){
    var query = User.findOne({username : user}).update({}, {$addToSet: {shared: meme}}, {multi: true})
    return query
}

exports.removePost = function(user, meme){
    var query = User.findOne({username : user}).update({}, {$pull: {posts: meme}}, {multi: true})
    return query
}

exports.addPost = function(user, meme){
    var query = User.findOne({username : user}).update({}, {$addToSet: {posts: meme}}, {multi: true})
    return query
}

//add User in 