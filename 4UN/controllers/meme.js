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
    if (req.body.status == "on") {
        var status = "Public"
    } else {
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

    Meme.addNewMeme(meme).then((newMeme) => {
        console.log("Added Meme to database")
        console.log(newMeme)
        
        for(let x = 0; x<tags.length; x++)
            Tag.getTag(tags[x]).then((suc)=>{
                if(suc){ //tag exists already
                    Tag.addMeme(succ.name, newMeme).then((succ)=>{
                        console.log("Added Meme to Tag Successful")
                    }, (er)=>{
                        console.log("Error in Tag")
                    })
                } else { //makes a new tag with the meme
                    var memes = [newMeme]
                    var tag = {
                        name: tags[x],
                        memes
                    }
                    Tag.addTag(tag).then((succc)=>{
                        console.log("Created a new Tag Successfully")
                    }, (errr)=>{
                        console.log("ERROR: " + errr)
                    })
                }
                
            }, (err)=>{
                console.log("Error: " + err)
            })
        
        
        
        User.addPost(owner, newMeme).then(() => {
            console.log("added meme")
            for (var i = 0; i < shared.length; i++) {
                console.log(shared)
                console.log(shared[i])
                User.updateShared(shared[i], newMeme).then(() => {
                    console.log("added meme to user")
                }, (err) => {
                    console.log("Adding to shared: " + err)
                })
            }
            resp.redirect("/")
        }, (err) => {
            console.log("Adding to user failed: " + err)
        })
    }, (err) => {
        console.log("Adding Fail: " + err)
    })
})

router.post("/addShare", urlencoder, (req,resp)=>{
    console.log("POST /meme/addShare")
    var memeId = req.body.memeId
    var share = req.body.newShare.split(",")
    
    console.log(share)
    console.log(memeId)
})

router.post("/editDesc", urlencoder, (req,resp)=>{
    console.log("POST /meme/editDesc")
    var memeId = req.body.memeId
    var desc = req.body.newDesc
    
    console.log(desc)
    console.log(memeId)
})

router.post("/addTags", urlencoder, (req,resp)=>{
    console.log("POST /meme/addTags")
    var memeID = req.body.memeId
    var newTags = req.body.newTags.split(",")
    
    var newMeme
    
    Meme.findSpecific(memeID).then((foundMeme)=>{
        newMeme = foundMeme
        console.log(JSON.stringify(newTags))
        newMeme.tags = newMeme.tags.concat(newTags)
        
        for(let x = 0; x<newTags.length; x++)
            Tag.getTag(newTags[x]).then((suc)=>{
                if(suc){ //tag exists already
                    Tag.addMeme(succ.name, newMeme).then((succ)=>{
                        console.log("Added Meme to Tag Successful")
                    }, (er)=>{
                        console.log("Error in Tag")
                    })
                } else { //makes a new tag with the meme
                    var memes = [newMeme]
                    var tag = {
                        name: newTags[x],
                        memes
                    }
                    Tag.addTag(tag).then((succc)=>{
                        console.log("Created a new Tag Successfully")
                    }, (errr)=>{
                        console.log("ERROR: " + errr)
                    })
                }
                
            }, (err)=>{
                console.log("Error: " + err)
            })
        
        User.findShared(memeID).then((foundUsers)=>{
            if(foundUsers)
                for(let x = 0; x<foundUsers.length; x++)
                    User.editShared(foundUsers[x], newMeme).then((suc)=>{
                        console.log("Sammie")
                    }, (err)=>{
                        console.log("Nea")
                    })
        })
        
        User.findOwner(memeID).then((foundOwner)=>{
            if(foundOwner)
                User.editPosts(foundOwner, newMeme).then((suc)=>{
                    console.log("Sammie")
                }, (err)=>{
                    console.log("Nea")
                })
        }, (err)=>{
            console.log("Nea: " + err)
        })
        
        console.log("New Meme is " + JSON.stringify(newMeme))
        Meme.updateOne(memeID, newMeme).then((succ)=>{
            console.log("Update Successful: " + succ)
            resp.send(newMeme)
        }, (err)=>{
            console.log("ERROR: " + err)
        })
    }, (err)=>{
        console.log("Error why")
    })
    
    
    
    console.log(req.body.memeId)
    console.log(req.body.newTags)

})

router.post("/getMeme", urlencoder, (req, resp) => {
    console.log("POST /meme/getMeme")
    var memeId = req.body.memeid

    Meme.findSpecific(memeId).then((newdoc) => {
        resp.send(newdoc)
    }, (err) => {

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
