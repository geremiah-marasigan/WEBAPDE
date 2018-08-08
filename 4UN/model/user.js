// create mongoose document ticket
const mongoose = require("mongoose");
var Meme = require("mongoose").model("Meme")
var MemeSchema = Meme.schema

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    description: {type: String, default: "No Description"},
    profilepicture: Buffer,
    posts: [MemeSchema],
    shared: [MemeSchema]
});

var User = mongoose.model("User", UserSchema);

module.exports = User