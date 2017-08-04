var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


//LANDING PAGE or Root Route
router.get("/", function(req, res){
    res.render("landing");
});



//=========AUTH ROUTES==========

//REGISTER
//show Register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle SignUp logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome, " + user.username);
           res.redirect("/events"); 
        });
    });
});


//LOGIN
//show LogIn form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling LogIn logic      
router.post("/login", passport.authenticate("local",    //LogIn happens using middleware - passport.authentiacte, provided by passport-local-mongoose package
    {
        successRedirect: "/events",
        failureRedirect: "/login"
    }), function(req, res){
});     //this callback doesn't do anything, it's just there to show that passport.authenticate is a middleware, you can also remove this callback if you like



//LOGOUT
//LogOut is already provided in passport-local-mongoose package
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/events");
});




module.exports = router;