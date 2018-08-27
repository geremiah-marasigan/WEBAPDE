const express = require("express")
const router = express.Router()
const app = express()

const cookieparser = require("cookie-parser")

const Meme = require("../model/meme.js");
const User = require("../model/user.js");
const Tag = require("../model/tag.js");

router.use("/user", require("./user"))
router.use("/tags", require("./tags"))
router.use("/meme", require("./meme"))

router.use(cookieparser())

router.get("/", (req, resp) => {
    console.log("GET /");
    var username = req.cookies.username
    
    var col1 = []
    var col2 = []
    var col3 = []
    
    if(username)
        User.sharedMemes(username).then((sharedMemes)=>{
            for(let x = 0; x<sharedMemes.length; x++)
                if(x % 3 === 0)
                    col1.push(sharedMemes[x])
                else if (x % 3 === 1)
                    col2.push(sharedMemes[x])
                else
                    col3.push(sharedMemes[x])
        }, (err) => {
            console.log("Error getting shared Memes: " + err)
        })
    
    Meme.getPublic().then((publicmemes)=>{
        for(let x = 0; x<publicmemes.length; x++)
            if(x % 3 === 0){
                if(!(col1.includes(publicmemes[x])))
                    col1.push(publicmemes[x])
            } else if (x % 3 === 1) {
                if(!(col2.includes(publicmemes[x])))
                    col2.push(publicmemes[x])
            } else {  
                if(!(col3.includes(publicmemes[x])))
                    col3.push(publicmemes[x])
            }
    }, (err)=>{
       console.log("Error getting memes: " + err) 
    })
    
    
    // User.findSpecific(user_parsed).then((foundUser)=>{
    User.findSpecific(username).then((foundUser)=>{
        if(foundUser){
            resp.render("index.hbs", {
                user: foundUser,
                col1,
                col2,
                col3
            })
            
        } else {
            resp.render("index.hbs", {
                col1,
                col2,
                col3
            })  
        }
    })
});

router.get("/about",(req,resp)=>{
    resp.render("about.hbs")
})

//app.post("/registered", urlencoder, (req, resp)=>{
//    //when they send their info
//})

module.exports = router
