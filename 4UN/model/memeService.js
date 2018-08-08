const mongoose = require("mongoose");
var Meme = require("mongoose").model("Meme")
var MemeSchema = Meme.schema

exports.getAll = function(){
    var query = Meme.find().sort({_id:-1}).limit(12)
    return query
}

exports.deleteMe = function(memeid){
    var query = Meme.remove({
        _id:memeid
    })
    return query
}

exports.updateOne = function(meme,updated){
    var query = Meme.findOneAndUpdate({
        "_id":meme
    }, updated)
    return query
}

exports.findSpecific = function (meme){
    var query = Meme.findOne({"_id": meme})
    return query
}

//only show 12
exports.getPublic = function(){
    var query = Meme.find({"status" : "public"}).sort({_id:-1}).limit(12)
    return query    
}

//n is the number of times view more was clicked
exports.viewMoreAll = function(n){
    var x = n*12
    var query = Meme.find().sort({_id:-1}).limit(12).skip(x)
    return query
}


exports.viewMorePublic = function(n){
    var x = n*12
    var query = Meme.find({"status" : "public"}).sort({_id:-1}).limit(12).skip(x)
    return query
}



