var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Event           = require("./models/event"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash")
//requring routes
var commentRoutes   = require("./routes/comments"),
    eventRoutes     = require("./routes/events"),
    indexRoutes     = require("./routes/index")




mongoose.connect("mongodb://localhost/event", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//=====PASSPORT CONFIGURATION=======================
//comes with package - passportLocalMongoose (so we don't have to write it ourselves)

app.use(require("express-session")({
    secret: "Nothing for you",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=================================================
 
 
//app will use request of current (logged in user) info on every Route, so we don't have to write the object line of {currentUser: req.user} manualy 
//the same with message. By this function you can use message (followed by flash) on every Route.
app.use(function(req, res, next){
   res.locals.currentUser = req.user; 
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});



//makes the app use Route files
app.use("/", indexRoutes);
app.use("/events", eventRoutes);
app.use("/events/:id/comments", commentRoutes);




//SERVER STARTING UP
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started!"); 
});