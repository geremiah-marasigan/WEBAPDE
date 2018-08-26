// create mongoose document ticket
const mongoose = require("mongoose");
const Meme = require("../model/meme.js");
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
    profilepicture: {type: String, default: "f2ee3b7289cbc831ffbef1903402f831"},
    originalprofilename: {type: String},
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
exports.login = function (user){
    return new Promise(function(res, rej){
        User.findOne(
            {username: user.username,
             password: user.password
            }
        ).then((founduser)=>{
            console.log("User " + user.username + " Found")
            res(founduser)
        }, (err)=>{
            console.log("User not found")
            rej(err)
        })  
    }) 
}

exports.findSpecific = function (user){
    return new Promise(function(res, rej){
        User.findOne(
            {username: user.username
            }
        ).then((founduser)=>{
            res(founduser)
        }, (err)=>{
            console.log("ERROR")
            rej(err)
        })  
    }) 
}

//Get the memes uploaded by a specific user, for profile page
//only shows latest 12 memes
exports.getMemes = function(user){
    return new Promise(function(res, rej){
        User.findOne(
            {username: user.username
            },
            {posts: 1}
        ).sort({_id:-1}).limit(12).then((memes)=>{
            console.log("Memes Found")
            res(memes)
        }, (err)=>{
            console.log("User not found")
            rej(err)
        })  
    })
}

//Get the memes shared to a specific user, for profile page
//only shows latest 12 memes
exports.sharedMemes = function(user){
    return new Promise(function(res, rej){
        User.findOne(
            {username: user.username
            },
            {shared: 1}
        ).sort({_id:-1}).limit(12).then((memes)=>{
            console.log("Memes Found")
            res(memes)
        }, (err)=>{
            console.log("Memes not found" + err)
            rej(err)
        })  
    })
}

//Remove a selected shared meme
exports.removedShared = function(user, meme){
    return new Promise(function(res, rej){
        User.findOne(
            {username: user.username
            } 
        ).update({}, {$pull: {shared: meme}}, {multi: true}).then((succ)=>{
            console.log("Remove Successful" + succ)
            res(succ)
        }, (err)=>{
            console.log("Remove Failed")
            rej(err)
        })  
    })
}

exports.updateShared = function(user, meme){
    return new Promise(function(res, rej){
        User.findOne(
            {username: user.username
            } 
        ).update({}, {$addToSet: {shared: meme}}, {multi: true}).then((succ)=>{
            console.log("Added Shared successful")
            res(succ)
        }, (err)=>{
            console.log("User not found")
            rej(err)
        })  
    })
    
}

exports.removePost = function(user, meme){
    return new Promise(function(res, rej){
        User.findOne(
            {username: user.username
            } 
        ).update({}, {$pull: {posts: meme}}, {multi: true}).then((succ)=>{
            console.log("Remove Successful" + succ)
            res(succ)
        }, (err)=>{
            console.log("Remove Failed")
            rej(err)
        })  
    })
}

exports.addPost = function(user, meme){
    return new Promise(function(res, rej){
        User.findOne(
            {"username": user
            } 
        ).update({}, {$addToSet: {posts: meme}}, {multi: true}).then((succ)=>{
            console.log("Added Post successful")
            res(succ)
        }, (err)=>{
            console.log("Post Error: " + err )
            rej(err)
        })  
    })
}

exports.addNewUser = function(user){
    return new Promise(function(resolve, reject){
    var u = new User(user)
    u.save().then((newUser)=>{
      resolve(newUser)
    }, (err)=>{
      reject(err)
    })
  })
}

