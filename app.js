var express          =require("express"),
    app              =express(),
    bodyparser       =require("body-parser"),
    mongoose         =require("mongoose"),
    flash            =require("connect-flash"),
    passport         =require("passport"),
    LocalStrategy    =require("passport-local"),
    methodOverride   =require("method-override"),
    Campground       =require("./models/campground"),
    Comment          =require("./models/comment"),
    User             =require("./models/user"),
    path             =require('path'),
    seedDB           =require("./seeds");

    var commentRoutes= require("./routes/comments"),
    campgroundRoutes=  require("./routes/campgrounds"),
    indexRoutes=  require("./routes/index");
    
   
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb+srv://gunjan:Gunjan1997@cluster0-xskbl.mongodb.net/test?retryWrites=true&w=majority");
app.use(bodyparser.urlencoded({encoded: false}));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());  
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.set('views',path.join(__dirname,'views'));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
     res.locals.currentUser=req.user;
     res.locals.error=req.flash("error");
     res.locals.success=req.flash("success");
     next();
});


app.use(indexRoutes); 
app.use(campgroundRoutes);
app.use(commentRoutes);


 app.listen(3000,function(){
  console.log("The YelpCamp Server has started");
});