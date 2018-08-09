// create mongoose document ticket
const mongoose = require("mongoose");

var MemeSchema = mongoose.Schema({
    title: String,
    owner: String,
    description: String,
    status: String, //public or private
    shared: [String],
    tags: [String],
    image: Buffer
    
});

var Meme = mongoose.model("Meme", MemeSchema);

module.exports = Meme