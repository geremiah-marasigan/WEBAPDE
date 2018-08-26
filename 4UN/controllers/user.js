const express = require("express")
const router = express.Router()
const app = express()

const bodyparser = require("body-parser");
const crypto = require("crypto")
const fs = require("fs");
const cookieparser = require("cookie-parser")
const multer = require("multer");
const path = require("path");
//makes forms readabel as request.body/request.query
const urlencoder = bodyparser.urlencoded({
    extended: false
});

const Meme = require("../model/meme.js");
const User = require("../model/user.js");
const Tag = require("../model/tag.js");

const UPLOAD_PATH = path.resolve(__dirname, "../Profiles")
const upload = multer({
    dest: UPLOAD_PATH,
    limits: {
        fileSize: 10000000,
        files: 2
    }
})

router.use(cookieparser())

router.get("/userProfile", urlencoder, (req, resp)=>{
    var username = req.body.owner
    console.log(username)
})

router.get("/userPage", (req, resp) => {
    console.log("GET /user")

    var username = req.cookies.username
    
    // var user_cookie = req.cookies.user
    // var user_parsed
    // 
    // if(user_cookie){
    //   user_parsed = JSON.parse(user_cookie)
    //   var uname = user_parsed['username']
    // }
    // var query = User.findSpecific(uname)
    
    console.log("Username is " + username)
    
    User.findSpecific(username).then((foundUser)=>{
     // User.findSpecific(user_parsed).then((foundUser)=>{
        if(foundUser){
            console.log("userpage " + foundUser)
            resp.render("user.hbs", {
                user: foundUser
            })
        }
        
    })
})

router.get("/loginPage", (req, resp) => {
    console.log("GET user/login")
    resp.render("login.hbs")
})

router.post("/login", urlencoder, (req, resp) => {
    console.log("POST user/login")

    var username = req.body.uname
    var unhashedpassword = req.body.pword
    var password = crypto.createHash("md5").update(unhashedpassword).digest("hex")
    
    var user = {
        username,
        password
    }
    
    User.login(user).then((newUser)=>{
        console.log("login " + newUser)
        if(newUser){
          
          // var user_string = JSON.stringify(newUser)
          
            resp.cookie("username", username, {
            // resp.cookie("user", user_string, {
                maxAge: 1000 * 60 * 60 * 2
            })
            resp.redirect('/')
        }
          else{
              var message = "Invalid username / password.";
              
              resp.render("login.hbs", {
                message
              })
          }
    })

})

router.get("/signupPage", (req, resp) => {
    console.log("GET user/signup")
    resp.render("signup.hbs")
})

router.post("/signup", upload.single("ppic"), urlencoder, (req, resp) => {
    console.log("POST user/signup")
    
    var profilepicture
    var username = req.body.uname
    var email = req.body.email
    var unhashedpassword = req.body.pword
    var desc = req.body.sdesc
    if(req.file){
        profilepicture = req.file.filename
    }
    var password = crypto.createHash("md5").update(unhashedpassword).digest("hex")

    var user = ({
        username,
        password,
        profilepicture,
        posts: [],
        shared: []
    })

    User.addNewUser(user).then((newUser)=>{
        console.log("add " + newUser)
        
        // var user_string = JSON.stringify(user)
        
        resp.cookie("username", username, {
        // resp.cookie("user", user_string, {
            maxAge: 1000 * 60 * 60 * 2
        })
        resp.render("index.hbs", {
            user
        })
        
    }, (err)=>{
        console.log("add fail")
    })
    
//    user.save().then((newdoc) => {
//        resp.cookie("username", username, {
//            maxAge: 1000 * 60 * 60 * 2
//        })
//        console.log("Successful")
//        resp.render("index.hbs", {
//            user
//        })
//
//    }, (err) => {
//        console.log("Not")
//    })
})

router.get("/signout", urlencoder, (req, resp) => {
    resp.clearCookie("username")
    // resp.clearCookie("user")
    resp.render("index.hbs")
})

// this should be in controller post
router.get("/photo/:id", (req, res) => {
    console.log("called picture")
    console.log(req.params.id)
    fs.createReadStream(path.resolve(UPLOAD_PATH, req.params.id)).pipe(res)
})
// if passing the img rather than the post id
// change doc.filename to req.params.id

// always remember to export the router for index.js
module.exports = router