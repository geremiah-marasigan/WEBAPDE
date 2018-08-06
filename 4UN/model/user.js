// create mongoose document ticket
const mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    description: String,
    profilepicture: Buffer
    
});

var User = mongoose.model("user", UserSchema);

module.exports = {
    User
}