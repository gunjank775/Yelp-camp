var express=require("express");
var router=express.Router();
var passport=require("passport");
var user=require("../models/user");



router.get("/",function(req,res)
{
     res.render("landing");
});

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
var newUser=new user({username: req.body.username});
user.register(newUser,req.body.password,function(err,user){
     if(err)
     {
          req.flash("error",err.message);
          return res.render("register");
     }
          passport.authenticate("local")(req,res,function(){
          req.flash("success","welcome to YelpCamp "+user.username);
      res.redirect("/campgrounds");
     });
});
});

//SHOW LOGIN FORM
router.get("/login",function(req,res){
res.render("login");
});
//handling login logic





router.post("/login",passport.authenticate("local",
{
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}),function(req,res){
});

//logic route

router.get("/logout",function(req,res){
          req.logout();
          req.flash("success","Logged You Out!");
          res.redirect("/campgrounds");
});



module.exports=router;