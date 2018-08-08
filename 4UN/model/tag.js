// create mongoose document ticket
const mongoose = require("mongoose");
var Meme = require("mongoose").model("Meme")
var MemeSchema = Meme.schema

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