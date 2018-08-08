const mongoose = require("mongoose");
var Meme = require("mongoose").model("Meme")
var MemeSchema = Meme.schema

function getAll(){
    var query = Meme.find().sort({_id:-1}).limit(12)
    return query
}

//only show 12
function getPublic(){
    var query = Meme.find({"status" : "public"}).sort({_id:-1}).limit(12)
    return query
    
}