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

router.post("/uploadMeme", upload.single("meme"), urlencoder, (req, resp) => {
    console.log("POST meme/upload")

    var title = req.body.title
    var owner = req.body.owner
    var desc = req.body.desc
    if(req.body.status == "on"){
        var status = "Public"
    }
    else{
        var status = "Private"
    }
    var image = req.file.filename
    var shared = req.body.shared.split(",")
    var tags = req.body.tags.split(",")
    var owner = req.cookies.username
    var meme = {
        title,
        owner,
        description: desc,
        image,
        status,
        shared,
        tags
    }

    Meme.addNewMeme(meme).then(() => {
        console.log("Added Meme to database")
    }, (err) => {
        console.log("Adding Fail: " + err)
    })
})
router.post("/getMeme",urlencoder,(req,resp)=>{
    console.log("POST /meme/getMeme")
    var memeId = req.body.memeid
    
    Meme.findSpecific(memeId).then((newdoc)=>{
        resp.send(newdoc)
    },(err)=>{
        
    })
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
