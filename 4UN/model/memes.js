// create mongoose document ticket
const mongoose = require("mongoose");
var UserSchema = require("mongoose").model("User").schema


var MemeSchema = mongoose.Schema({
    owner: UserSchema,
    description: String,
    status: String, //public or private
    shared: [UserSchema],
    tags: [String],
    image: Buffer
    
});

var Meme = mongoose.model("meme", MemeSchema);

module.exports = {
    Meme
}