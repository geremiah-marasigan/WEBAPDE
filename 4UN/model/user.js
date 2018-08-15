// create mongoose document ticket
const mongoose = require("mongoose");
var Meme = require("mongoose").model("Meme")
var MemeSchema = Meme.schema

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
              },
    password: {
        type: String,
        required: true,
        trim: true
              },
    description: {type: String, default: "No Description"},
    profilepicture: {type: String, default: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg"},
    posts: [MemeSchema],
    shared: [MemeSchema]
});

var User = mongoose.model("User", UserSchema);

module.exports = User