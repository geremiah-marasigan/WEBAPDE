const bodyparser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const fs = require("fs");

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
app.use(express.static(__dirname + "/views"));
app.set("view-engine", "hbs");

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
    
    resp.render("index.hbs",{
        col1:["https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A","https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A","https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A"],
        col2:["https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A","https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A","https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A"],
        col3:["https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A","https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A","https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A"]
    })
});

app.get("/tagPage", (req,resp)=>{
    console.log("GET /tags")
    resp.render("tags.hbs")
})

app.get("/userPage", (req, resp)=>{
    console.log("GET /user")
    resp.render("user.hbs")
})

app.get("/loginPage", (req, resp)=>{
    console.log("GET /login")
    resp.render("login.hbs")
})

app.post("/login", urlencoder, (req,resp)=>{
    console.log("POST /login")
    
    var username = req.body.uname 
    var password = req.body.pword 
    var user = {
        profilepic: "https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/23518934_146331502660485_6251669915140632690_n.jpg?_nc_cat=0&oh=e2928920827b2d448baa598f14ff8eb0&oe=5BCD344A"
    }
    //put user check here
    if(username == "admin" && password == "1234"){
        console.log("SUCCESS")
        resp.render("index.hbs", {
            user
        })
    } else {
        console.log(username + " " + password)
        resp.render("login.hbs", {
            message: "Invalid username or password"
        })
    }
    
})

app.get("/signupPage", (req,resp)=>{
    console.log("GET /signup")
    resp.render("signup.hbs")
})

app.post("/signup", urlencoder, (req, resp)=>{
    console.log("POST /signup")
    
    var username = req.body.uname 
    var email = req.body.email
    var password = req.body.pword 
    var desc = req.body.sdesc 
    var profile = req.body.ppic
    
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(desc)
    console.log(profile)

})

app.post("registered", urlencoder, (req, resp)=>{
    //when they send their info
})

app.listen(3000,()=>{
    console.log("Listening to port 3000")
});