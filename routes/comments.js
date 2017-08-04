var express = require("express");
var router  = express.Router({mergeParams: true});
var Event = require("../models/event");
var Comment = require("../models/comment");
var middleware = require("../middleware");




//NEW COMMENTS
router.get("/new", middleware.isLoggedIn, function(req, res){  //isLoggedIn - function (declared below the script) that's a middleware that checks if user is logged in and only if true proceeds.
    //find event by id
    Event.findById(req.params.id, function(err, event){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {event: event});
        }
    });
});

//CREATE COMMENTS
router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup events usind id
   Event.findById(req.params.id, function(err, event){
       if(err){
           console.log(err);
           res.redirect("/events");
       } else {
        //create a new comment
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flas("error", "Something went wrong!");
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               event.comments.push(comment);
               event.save();
               req.flash("success", "Successfully added comment!");
               res.redirect('/events/' + event._id);
           }
        });
       }
   });
});



//EDIT COMMENTS
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
            res.redirect("back");
       } else {
            res.render("comments/edit", {event_id: req.params.id, comment: foundComment});         
       }
    });
});


//UPDATE COMMENTS
router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err) {
          res.redirect("back");
      } else {
          res.redirect("/events/" + req.params.id);
      }
   }); 
});


//DESTROY COMMENTS
router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      } else {
          req.flash("success", "Comment deleted.");
          res.redirect("/events/" + req.params.id);
      }
   });
});




module.exports = router;