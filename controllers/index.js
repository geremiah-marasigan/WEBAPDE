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
    console.log("sammie");
    console.log("GET /");
    var username = req.cookies.username
    console.log("sammie");
    var col1 = []
    var col2 = []
    var col3 = []
    
    var col = 0
    
    if(username){
        console.log("Shared Enter")
        User.sharedMemes(username).then((sharedMemes)=>{
            console.log("Shared memes: " + JSON.stringify(sharedMemes))
            if(sharedMemes){
                for(let x = 0; x<sharedMemes.shared.length; x++){
                    if(col % 3 === 0)
                        col1.push(sharedMemes.shared[x])
                    else if (col % 3 === 1)
                        col2.push(sharedMemes.shared[x])
                    else
                        col3.push(sharedMemes.shared[x])
                    col++
                }
            }
        }, (err) => {
            console.log("Error getting shared Memes: " + err)
        })
    }
    
    Meme.getPublic().then((publicmemes)=>{
        for(let x = 0; x<publicmemes.length; x++){
            if(col % 3 === 0){
                if(!(col1.includes(publicmemes[x])))
                    col1.push(publicmemes[x])
            } else if (col % 3 === 1) {
                if(!(col2.includes(publicmemes[x])))
                    col2.push(publicmemes[x])
            } else {  
                if(!(col3.includes(publicmemes[x])))
                    col3.push(publicmemes[x])
            }
            col++
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
    var username = req.cookies.username
    
    User.findSpecific(username).then((foundUser)=>{
        if(foundUser){
            resp.render("about.hbs", {
                user: foundUser
            })
            
        } else {
            resp.render("about.hbs", {
            })  
        }
    })
})

//app.post("/registered", urlencoder, (req, resp)=>{
//    //when they send their info
//})

module.exports = router
