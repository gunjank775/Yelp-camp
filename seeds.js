var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");


var data=[
    {
        name : "cloud",
        image : "https://cdn.solace.com/wp-content/uploads/2019/01/bg-clouds.jpg",
        description : "Cloud is awesome"
    }
    ,
    {
        name : "cloud2",
        image : "https://cdn.solace.com/wp-content/uploads/2019/01/bg-clouds.jpg",
        description : "bvsfjhbvsj"
    },
    {
        name : "cloud3",
        image : "https://cdn.solace.com/wp-content/uploads/2019/01/bg-clouds.jpg",
        description : "gsdfhdfh"
    }
]

function seedDB()
{
    Campground.remove({},function(err){
        if(err){
         console.log(err);
        }else{
        console.log("removed campgrounds");}
        data.forEach(function(seed)
        {
           Campground.create(seed,function(err,campground){
            if(err){
                console.log(err);
               }else{
               console.log("added campgrounds");
               Comment.create(
                   {
                       text: "I am gunjan",
                       author: "Gunjan"
                   },function(err,comment){
                         if(err)
                         {
                             console.log(err);
                         }
                         else{
                             campground.comments.push(comment);
                             campground.save();
                             console.log("created new comment");
                         }
                   } );
            }
           });
        });
    });
   
}
module.exports=seedDB;