const mongoose = require("mongoose");
var Tag = require("mongoose").model("Tag")
var TagSchema = Tag.schema

function getAll(){
    var Tags = Tag.find().then((tags)=>{
        return tags
    },(err)=>{
        return false  
    });
}

function getMemes(query){
    Tag.findOne({"name": query}).then((tag)=>{
        return tag.memes
    }, (err)=>{
      console.log("Error getting Memes: " + err)  
    })
}