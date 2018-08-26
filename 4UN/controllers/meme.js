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

router.post("/upload", upload.single("meme"), urlencoder, (req, resp) => {
    console.log("POST meme/upload")

    var title = req.body.title
    var owner = req.body.owner
    var desc = req.body.desc
    var status = req.body.status
    var image = req.file.filename

    var meme = {
        title,
        owner,
        description: desc,
        image
    }

    Meme.addNewMeme(meme).then(() => {
        console.log("Added Meme to database")
    }, (err) => {
        console.log("Adding Fail: " + err)
    })
})

// this should be in controller post
router.get("/photo/:id", (req, res) => {
    console.log("called picture")
    console.log(req.params.id)
    Post.findOne({
        _id: req.params.id
    }).then((doc) => {
        fs.createReadStream(path.resolve(UPLOAD_PATH, doc.filename)).pipe(res)
    }, (err) => {
        console.log(err)
        res.sendStatus(404)
    })
})
// if passing the img rather than the post id
// change doc.filename to req.params.id

// always remember to export the router for index.js
module.exports = router
