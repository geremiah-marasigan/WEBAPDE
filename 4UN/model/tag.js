// create mongoose document ticket
const mongoose = require("mongoose");
const Meme = require("meme.js");
var MemeSchema = Meme.schema

var exports = module.exports = {};

var TagSchema = mongoose.Schema({
    name: {type : String,
        required : true,
        minlength : 3,
        trim : true
    },
    memes: [MemeSchema]
});

var Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag