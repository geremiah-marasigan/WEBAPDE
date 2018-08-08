const mongoose = require("mongoose");
var Tag = require("mongoose").model("Tag")
var TagSchema = Tag.schema

var exports = module.exports = {};

exports.getAll = function(){
    var query = Tag.find({})
    return query
}

//Because our tags are made by us (no custom tags)
exports.getAllNames = function(){
    var query = Tag.find({}, {name: 1})
    return query
}


exports.getTag = function(tag){
    var query = Tag.findOne({"name": tag})
    return query
}

//Get the memes of a specific tag name
exports.getMemes = function(query){
    return getTag(query).memes
}

//Adds a meme to the specified tag
exports.addMeme = function(name, newMeme){
    var schema = newMeme.schema
    
    var t = this.getTag(name)
    t.memes.push(schema)
}

//just in case
//function newTag(name){
//    var t = new Tag({
//        name
//    })
//    
//    t.save().then(()=>{
//        //successfully added ticket
//        resp.render("index.hbs", {
//            message : "Ticket was added successfully"
//        })
//    }, (err)=>{
//        resp.render("index.hbs", {
//            message : "something went wrong" + err
//        })
//    });
//}