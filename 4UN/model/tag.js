// create mongoose document ticket
const mongoose = require("mongoose");
var Meme = require("mongoose").model("Meme")
var MemeSchema = Meme.schema

var TagSchema = mongoose.Schema({
    name: String,
    memes: [MemeSchema]
});

var Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag