const mongoose = require("mongoose");
var Meme = require("mongoose").model("Meme")
var MemeSchema = Meme.schema

export function getAll(){
    var query = Meme.find().sort({_id:-1}).limit(12)
    return query
}

//only show 12
export function getPublic(){
    var query = Meme.find({"status" : "public"}).sort({_id:-1}).limit(12)
    return query
    
}

//n is the number of times view more was clicked
export function viewMoreAll(n){
    var x = n*12
    var query = Meme.find().sort({_id:-1}).limit(12).skip(x)
    return query
}

export function viewMorePublic(n){
    var x = n*12
    var query = Meme.find({"status" : "public"}).sort({_id:-1}).limit(12).skip(x)
    return query
}



