const mongoose = require("mongoose");
var Tag = require("mongoose").model("Tag")
var TagSchema = Tag.schema

function getAll(){
    var Memes = Meme.find().then((memes)=>{
        return memes
    },(err)=>{
        return false  
    });
}