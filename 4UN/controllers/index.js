const express = require("express")
const router = express.Router()
const app = express()

const cookieparser = require("cookie-parser")

const Meme = require("../model/meme.js");
const User = require("../model/user.js");
const Tag = require("../model/tag.js");

router.use("/user", require("./user"))
router.use("/tags", require("./tags"))
router.use("/memes", require("./memes"))

router.use(cookieparser())

router.get("/", (req, resp) => {
    console.log("GET /");
    var username = req.cookies.username
    var user = {
        username
    }
    // var user_cookie = req.cookies.user
    // var user_parsed 
    // if(user_cookie){
    //   user_parsed = JSON.parse(user_cookie)
    // }
    // var uname = user_parsed['username']
    
    
    // User.findSpecific(user_parsed).then((foundUser)=>{
    User.findSpecific(user).then((foundUser)=>{
        if(foundUser){
            resp.render("index.hbs", {
                user: foundUser,
                col1: [],
                col2: [],
                col3: []
            })
            
        } else {
            resp.render("index.hbs", {
                col1: [],
                col2: [],
                col3: []
            })  
        }
    })
});

//app.post("/registered", urlencoder, (req, resp)=>{
//    //when they send their info
//})

module.exports = router
