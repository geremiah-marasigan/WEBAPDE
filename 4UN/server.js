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



app.get("/", (req, resp)=>{
    console.log("GET /");
    
    resp.render("index.hbs")
    //get all ticket data
//    var Tickets = Ticket.find().then((tickets)=>{
//        resp.render("index.hbs", {
//            tickets
//        });
//    },()=>{
//        resp.render("index.hbs");  
//    });
});

app.post("/home", urlencoder, (req, resp)=>{
    console.log("GET /home")
    
    resp.render("index.hbs")
})

app.get("/loginPage", (req, resp)=>{
    console.log("GET /login")
    resp.render("login.hbs")
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
    
    var user = new User({
        
    })

})

app.post("registered", urlencoder, (req, resp)=>{
    //when they send their info
})

//app.post("/addticket", urlencoder, (req, resp)=>{
//    //add ticket user inputted to database
//    //input
//    var event = req.body.event
//    var price = req.body.price
//    var category = req.body.category
//    var t = new Ticket({
//        event, category, price
//    })
//    //processing
//    t.save().then(()=>{
//        //successfully added ticket
//        resp.render("index.hbs", {
//            message : "Ticket was added successfully"
//        })
//    }, (err)=>{
//        resp.render("index.hbs", {
//            message : "something went wrong" + err
//        })
//    });
//    //output
//});
//
//app.post("/deleteticket", urlencoder, (req, resp)=>{
//    console.log(req.body.id);
//    //removing the ticket
//    Ticket.remove({
//        _id: req.body.id
//    }).then(()=>{
//        resp.redirect("/");
//    })
//    
//});
//
//app.get("/viewticket", urlencoder, (req, resp)=>{
//    Ticket.findOne({
//        _id: req.body.id
//    }).then((ticket)=>{
//        resp.render("edit.hbs", {
//            ticket
//        })
//    })
//})
//
//app.post("/editticket",urlencoder, (req, resp)=>{
//    var updatedTicket = {
//        event : req.query.event,
//        category : req.query.category,
//        price : req.query.price
//    };
//    
//    Ticket.findOneAndUpdate({
//        _id: req.query.id
//    }, updatedTicket).then(()=>{
//        resp.redirect("/");
//    })
//})

app.listen(3000,()=>{
    console.log("Listening to port 3000")
});