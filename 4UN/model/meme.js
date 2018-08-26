// create mongoose document ticket
const mongoose = require("mongoose");

var MemeSchema = mongoose.Schema({
    title: String,
    owner: String,
    description: String,
    status: String, //public or private
    shared: [String],
    tags: [String],
    image: String,
    originalfilename: {type: String},
});

var Meme = mongoose.model("Meme", MemeSchema);

var exports = module.exports = {}

exports.schema = MemeSchema

exports.deleteMe = function(memeid){
    return new Promise(function(res, rej){
        Meme.remove({
            _id:memeid
        }).then((succ)=>{
            console.log("Delete successful" + memeid)
            res(succ)
        }, (err)=>{
            console.log("Delete Failed")
            rej(err)
        })
        
    })
}

exports.updateOne = function(meme,updated){
    return new Promise(function(res, rej){
        Meme.findOneAndUpdate({
            "_id":meme
        }, updated).then((succ)=>{
            console.log("Update successful" + memeid)
            res(succ)
        }, (err)=>{
            console.log("Update Failed")
            rej(err)
        })
        
    })
    
}

exports.findSpecific = function (meme){
    return new Promise(function(res, rej){
        Meme.findOne(
            {"_id": meme
            }
        ).then((succ)=>{
            console.log("Find successful")
            res(succ)
        }, (err)=>{
            console.log("Find Failed")
            rej(err)
        })
        
    })
}

//only show 12
exports.getPublic = function(){
    return new Promise(function(res, rej){
        Meme.find(
            {status :"Public"}
        ).sort(
            {_id:-1}
        ).limit(12)
        .then((succ)=>{
            console.log("Get successful")
            res(succ)
        }, (err)=>{
            console.log("Get Failed")
            rej(err)
        })
        
    })
    
     
}

//n is the number of times view more was clicked
exports.viewMorePublic = function(n){
    var x = n*12
    
    return new Promise(function(res, rej){
        Meme.find({
            "status" : "public"
        }).sort(
            {_id:-1}
        ).limit(12).skip(x)
        .then((succ)=>{
            console.log("View More successful")
            res(succ)
        }, (err)=>{
            console.log("View More Failed")
            rej(err)
        })
        
    })
}

exports.addNewMeme = function(meme){
    return new Promise(function(resolve, reject){
    var m = new Meme(meme)
    m.save().then((newMeme)=>{
      resolve(newMeme)
    }, (err)=>{
      reject(err)
    })
  })
}
