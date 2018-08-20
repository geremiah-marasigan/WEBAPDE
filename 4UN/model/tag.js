// create mongoose document ticket
const mongoose = require("mongoose");
const Meme = require("meme.js");
var MemeSchema = Meme.schema

var TagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    memes: [MemeSchema]
});

var Tag = mongoose.model("Tag", TagSchema);

var exports = module.exports = {};

exports.schema = TagSchema

//Because our tags are made by us (no custom tags)
exports.getAllNames = function () {
    return new Promise(function (res, rej) {
        Tag.find({}, {
            name: 1
        }).then((succ) => {
            console.log("Get All successful" + memeid)
            res(succ)
        }, (err) => {
            console.log("Get All Failed")
            rej(err)
        })

    })

}


exports.getTag = function (tag) {
    
    return new Promise(function (res, rej) {
        Tag.findOne({
            "name": tag
        }).then((succ) => {
            console.log("Get All successful" + memeid)
            res(succ)
        }, (err) => {
            console.log("Get All Failed")
            rej(err)
        })

    })
    
}

//Get the memes of a specific tag name
//First 12
exports.getMemes = function (tag) {
    return new Promise(function (res, rej) {
        Tag.findOne({
            "name": tag
            }, {
            memes: 1
        }).then((succ) => {
            console.log("Get All successful" + memeid)
            res(succ)
        }, (err) => {
            console.log("Get All Failed")
            rej(err)
        })
    })
}

//Adds a meme to the specified tag
exports.addMeme = function (name, meme) {
    return new Promise(function (res, rej) {
        Tag.findOne({
            name: name
        }).update({}, {
            $addToSet: {
                memes: meme
            }
        }, {
            multi: true
    }).then((succ) => {
            console.log("Get All successful" + memeid)
            res(succ)
        }, (err) => {
            console.log("Get All Failed")
            rej(err)
        })
    })
}

exports.removeMeme = function (name, meme) {
    return new Promise(function(res, rej){
        Tag.findOne({
            name: name
        }).update({}, {
            $pull: {
                memes: meme
            }
        }, {
            multi: true
        })
        
    })
    
    
}

//just in case
exports.addTag = function (tag) {
    return new Promise(function(res, rej){
    var t = new Tag(tag)
    t.save().then((newUser)=>{
      res(newUser)
    }, (err)=>{
      rej(err)
    })
  })
}
