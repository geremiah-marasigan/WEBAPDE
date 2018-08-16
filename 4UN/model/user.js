// create mongoose document ticket
const mongoose = require("mongoose");
const Meme = require("meme.js");
var Meme = require("mongoose").model("Meme")
var MemeSchema = Meme.schema

var exports = module.exports = {};

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
              },
    password: {
        type: String,
        required: true,
        trim: true
              },
    description: {type: String, default: "No Description"},
    profilepicture: {type: String, default: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg"},
    posts: [MemeSchema],
    shared: [MemeSchema]
});

var User = mongoose.model("User", UserSchema);

//Going to use Mongoose Queries, to be called in server by exec() function
exports.getAll = function(){
    return new Promise(function(res, rej){
        User.find().then((user)=>{
            res(user)
        }, (err)=>{
            rej(err)
        })
    })
}

//Find specific user given his username, to be used when you click a users name from a meme since meme only stores his username
//Also used in authentication
exports.findSpecific = function (user){
    return new Promise(function(res, rej){
        User.findOne({"username": user}).then((user)=>{
            console.log("User " + query + " Found")
            res(user)
        }, (err)=>{
            console.log("User not found")
            rej(err)
        })
        
    }) 
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

exports.addNewUser = function(user){
    var query = user.save()
    return query
}

module.exports = User