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

const UPLOAD_PATH = path.resolve(__dirname, "../Memes")
const upload = multer({
    dest: UPLOAD_PATH,
    limits: {
        fileSize: 10000000,
        files: 2
    }
})

router.use(cookieparser())

router.get("/search", urlencoder, (req, resp) => {
    console.log("GET /tags")

    var tag = req.query.searchinput
    var uname = req.cookies.username
    var col1 = []
    var col2 = []
    var col3 = []
    var error
    var user
    
    console.log("Tag: " + tag)
    
    //Checks if tag exists first
    Tag.getTag(tag).then((found_tag)=>{
        console.log("GET tag successful: " + found_tag)
        if(found_tag===null){
            error = "No memes found with #" + tag
            tag = null
        }
    }, (err)=>{
        console.log("Error getting tag: " + err)
    })
    
    if(error===null)
        Tag.getMemes(tag).then((found)=>{
            for(let x = 0; x<found.memes.length; x++)
                if(x % 3 === 0)
                    col1.push(found.memes[x])
                else if (x % 3 === 1)
                    col2.push(found.memes[x])
                else
                    col3.push(found.memes[x])
        }, (err)=>{
            console.log("Error getting tagged memes: " + err)
        })
    console.log("User is " + uname)
    if(uname)
        User.findSpecific(uname).then((foundUser)=>{
            resp.render("tags.hbs", {
                tag,
                user: foundUser,
                col1,
                col2,
                col3,
                error
            })

        }, (err)=>{
            console.log("ERROR TAG FINDING USER: " + err)
        })
    
    console.log("User is " + JSON.stringify(user))
    
    
//    }

})

//router.post("/addNewTag", urlencoder, (req, resp) => {
//    var memeID = 0 //Kyle
//    var meme = {}
//    
//})
//
//router.post("/addToTag", urlencoder, (req, resp) =>{
//    var memeID = 0
//    
//})

// always remember to export the router for index.js
module.exports = router