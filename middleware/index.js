var Job = require("../models/job"),
    User = require("../models/user"),
    middlewareObj = {};
    
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that")
    res.redirect("/login");
}

module.exports = middlewareObj;