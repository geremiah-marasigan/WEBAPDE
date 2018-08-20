const express = require("express")
const router = express.Router()
const app = express()

const cookieparser = require("cookie-parser")

const MemeModel = require("../model/meme.js");
const UserModel = require("../model/user.js");
const TagModel = require("../model/tag.js");

const Meme = require("../model/memeService.js");
const User = require("../model/userService.js");
const Tag = require("../model/tagService.js");

router.use("/user", require("./user"))
router.use("/tags", require("./tags"))
router.use("/memes", require("./memes"))

router.use(cookieparser())

router.get("/", (req, resp) => {
    console.log("GET /");
    var uname = req.cookies.username

    if (uname) {
        var query = User.findSpecific(uname)
        query.exec(function (err, user) {
            if (err) {

            }
            //error
            else {
                resp.render("index.hbs", {
                    user,
                    col1: [],
                    col2: [],
                    col3: []
                })
            }
        })
    } else {
        resp.render("index.hbs", {
            col1: [],
            col2: [],
            col3: []
        })
    }
});

//app.post("/registered", urlencoder, (req, resp)=>{
//    //when they send their info
//})

module.exports = router
