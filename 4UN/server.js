const bodyparser = require("body-parser");
const crypto = require("crypto")
const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const fs = require("fs");
const cookieparser = require("cookie-parser")
const multer = require("multer");
const path = require("path");

const MemeModel = require("./model/meme.js");
const UserModel = require("./model/user.js");
const TagModel = require("./model/tag.js");

const Meme = require("./model/memeService.js");
const User = require("./model/userService.js");
const Tag = require("./model/tagService.js");

//app creates server
const app = express();
//makes forms readabel as request.body/request.query
const urlencoder = bodyparser.urlencoded({extended : false});
//sets view engine to handlebars
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public.Memes"));
app.set("view-engine", "hbs");
app.use(cookieparser())

const upload = multer({
  dest: "/public/Memes"
});

// connecting to our mongodb server
//Promise Library
mongoose.Promise = global.Promise;

//connect to the database
mongoose.connect("mongodb://localhost:27017/memedata", {
    useNewUrlParser: true 
});

/**************************************************************************************/

app.get("/", (req, resp)=>{
    console.log("GET /");
    var uname = req.cookies.username
    
    if (uname) {
        resp.render("index.hbs", {
            user: {
                uname: uname
            },
            col1: [
//            {
//            title: "lololol",
//            author: "bacon",
//            source: "https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A",
//            desc: "lololololololololol",
//            tags: ["girl","twice"]
//            }
        ],
            col2: [],
            col3: []
        })
    } else {
        resp.render("index.hbs", {
            col1: [
    //            {
    //            title: "lololol",
    //            author: "bacon",
    //            source: "https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A",
    //            desc: "lololololololololol",
    //            tags: ["girl","twice"]
    //            }
            ],
            col2: [],
            col3: []
        })
    }
});

app.get("/search", urlencoder, (req,resp)=>{
    console.log("GET /tags")
    
    var tag = req.query.searchinput
    console.log("Tag: " + tag)
    
    var uname = req.cookies.username
    if (uname) {
        resp.render("tags.hbs", {
            tag,
            user: {
                profilepic: userpic
            }
        })
    } else {
        resp.render("tags.hbs", {
            tag
        })
    }

})

app.get("/userPage", (req, resp)=>{
    console.log("GET /user")
    
    var uname = req.cookies.username
    var query = User.getAll()
    
    query.exec(function(err, users){
        if(err){
            
        }
            //error
        else{
            var matchinguser = users.filter((user)=>{
                if(user.username == uname){
                    return true
                }
                return false
            })
            
            if (matchinguser.length == 1){
                var user = matchinguser
                
                resp.render("userPage.hbs", {
                    user
                })
            }
        }
    })
    
    /*if (uname) {
        resp.render("user.hbs", {
            user: {
                username:uname
            }
        })
    } else {
        resp.render("user.hbs", {
        })
    }*/
})

app.get("/loginPage", (req, resp)=>{
    console.log("GET /login")
    resp.render("login.hbs")
})

app.post("/login", urlencoder, (req,resp)=>{
    console.log("POST /login")
    
    var username = req.body.uname 
    var unhashedpassword = req.body.pword 
    var password = crypto.createHash("md5").update(unhashedpassword).digest("hex")
    
    var query = User.getAll()
    query.exec(function(err, users){
        if(err){
            
        }
            //error
        else{
            var matchinguser = users.filter((user)=>{
                if(user.username == username && user.password == password){
                    return true
                }
                return false
            })
            
            if (matchinguser.length == 1){
                resp.cookie("username", username, {
                    maxAge: 1000 * 60 * 60 * 2
                })
                
                var user = matchinguser
                
                resp.render("index.hbs", {
                    user
                })
            }
            else{
                resp.render("login.hbs", {
                    message: "Invalid username or password"
                })
            }
        }
    })
})

app.get("/signupPage", (req,resp)=>{
    console.log("GET /signup")
    resp.render("signup.hbs")
})

app.post("/signup",upload.single("body.ppic"), urlencoder, (req, resp)=>{
    console.log("POST /signup")
    
    
    var username = req.body.uname 
    var email = req.body.email
    var unhashedpassword = req.body.pword 
    var desc = req.body.sdesc 
    //var profile = req.ppic.path
    //console.log(profile)
    var password = crypto.createHash("md5").update(unhashedpassword).digest("hex")
    
    //if you can make the profile a proper picture, it would be greatly appreciated
    
    var user = new UserModel({
        username,
        password,
        desc,
<<<<<<< HEAD
        profilepicture,
=======
>>>>>>> 483e012d7ddda30d49dc5f19c6ab6092d1692779
        posts: [],
        shared: []
    })
    
    user.save().then((newdoc) => {
        //successful 
//        response.render("index.hbs", {
//            message: "Ticket was added successfully"
//        })
        console.log("Successful")
        resp.render("index.hbs", {
            user
        })
        
    }, (err) => {
//        response.render("index.hbs", {
//            message: "Ticket was not added" + err
//        })
        console.log("Not")
    })
})

//app.post("/registered", urlencoder, (req, resp)=>{
//    //when they send their info
//})

app.get("/signout", urlencoder, (req, resp)=>{
    resp.clearCookie("userpicture")
    resp.render("index.hbs")
})

app.listen(3000,()=>{
    console.log("Listening to port 3000")
});