var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Job = require("../models/job");
var middleware = require("../middleware")

//----------
// ROUTES
//----------    

//INDEX ROUTE
router.get("/", function(req, res) {
    res.redirect("/jobs")
    
})

router.get("/jobs", function(req, res) {
    Job.find({}, function(err,allJobs) {
        if (err) {
            console.log(err)
        } else {
            res.render("jobs/index", {jobs:allJobs});
        }
    })
})


//CREATE ROUTE - post new job
router.post("/jobs", middleware.isLoggedIn, function(req, res) {
    var job = req.body.job;
    var loc = req.body.loc;
    var time = req.body.time;
    var requester = {
        id:req.user._id,
        username:req.user.username,
        name:req.user.name
    }
    var additionalComments = req.body.additionalComments;
    var newJob = {job:job, loc:loc, time:time, additionalComments: additionalComments, requester:requester};
    console.log('new job is.....')
    console.log(newJob)
    Job.create(newJob, function(err, newlycreatedJob) {
        if (err) {
            console.log(err);
        } else {
                res.redirect("jobs")

        }
    })
})


//SHOW ROUTE
router.get("/jobs/:id", function(req, res) {
    Job.findById(req.params.id, function(err, foundJob) {
        if (err) {
            console.log(err);
            
        } else {
            res.render("jobs/show", {job:foundJob})
        }
    } )
})


//EDIT ROUTE
router.get("/jobs/:id/edit", function(req, res) {
    Job.findById(req.params.id, function(err, foundJob) {
        if (err) {
            console.log(err);
            
        } else {
            res.render("jobs/edit", {job:foundJob})
        }
    } )
})

//UPDATE ROUTE
router.put("/jobs/:id", function (req, res) {
    Job.findByIdAndUpdate(req.params.id, req.body.job, function(err, job) {
        if (err){
            console.log(err);
            req.flash("error", "Something went wrong");
            res.redirect("/")
        } else {
            req.flash("success", "Job Successfully Updated!")
            res.redirect("/jobs/" + req.params.id)
        }
    })
})

//DESTROY ROUTE
router.delete("/jobs/:id", function(req, res) {
    Job.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong");
            res.redirect("/")
        } else {
            req.flash("success", "Job Successfully Deleted")
            res.redirect("/jobs")
        }
    })
})

module.exports = router;