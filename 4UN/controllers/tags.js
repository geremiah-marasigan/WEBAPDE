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
    // var user_cookie = req.cookies.user
    // if(user_cookie){
    // var user_parsed = JSON.parse(user_cookie)
    // }
    console.log("Tag: " + tag)
//    if (uname) {
//        var query = User.findSpecific(uname)
//        query.exec(function (err, user) {
//            if (err) {
//
//            }
//            //error
//            else {
//                resp.render("tags.hbs", {
//                    tag,
//                    user
//                })
//            }
//        })
//    } else {
        resp.render("tags.hbs", {
            tag
        })
//    }

})

// always remember to export the router for index.js
module.exports = router