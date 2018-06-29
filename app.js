var express = require("express"),
    mongoose = require("mongoose"),
    app = express(),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash       = require ("connect-flash"),
    Job =  require("./models/job"),
    User = require("./models/user");
    
//require routes
var jobRoutes = require("./routes/jobs"),
    userRoutes = require("./routes/users");

//mongoose.connect("mongodb://localhost/jobtracker");
mongoose.connect("mongodb://tucker:1chapstick@ds121341.mlab.com:21341/jobtracker");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require("moment");

app.use(require("express-session")({
  secret:"Soft fluffy kitten paws",
  resave:false,
  saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})


app.use("/", jobRoutes);
app.use("/", userRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started!!");
});