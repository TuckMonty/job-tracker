var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Job = require("../models/job")


//show register page
router.get("/register", function(req, res){
    res.render("register");
})

//handle register logic
router.post("/register", function(req, res){
    if (req.body.adminCode !== "secretcode123"){
        return res.render("/register", {err:"Invaild Admin Code"});
    } 
    
    var newUser = {
        username:req.body.username,
        name:req.body.name
    }
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register", {error:err.message});
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", user.username + " is now registered")
                res.redirect("/jobs")
            })
        }
    })
})

//show login page
router.get("/login", function(req, res) {
    res.render("login");
})

//handle login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/jobs",
        failureRedirect:"/login"
}),function(req, res){})

//lougout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You have been logged out")
    res.redirect("/jobs");
})

//add user profile route here
router.get("/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            console.log(err);
            req.flash("error", "User not found");
            res.redirect("/jobs")
        } else {
            Job.find().where('requester.id').equals(foundUser._id).exec(function(err, jobs) {
                if (err){
                    console.log(err)
                    req.flash("error", "Something went wrong") 
                } else {
                    res.render("users/show", {user:foundUser, jobs:jobs})
                }
            })
         
        }
    })
})

module.exports = router;