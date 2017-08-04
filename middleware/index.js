//all the middleware goes here
var Event = require("../models/event");
var Comment = require("../models/comment");
var middlewareObject = {};

middlewareObject.checkEventOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Event.findById(req.params.id, function(err, foundEvent){
           if(err){
               req.flash("error", "We didn't found what you're looking for!");
               res.redirect("back"); //will bring user back to the previous page
           }  else {
               // does user own the comment?
            if(foundEvent.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be Logged In to do that!");
        res.redirect("back");
    }
}

middlewareObject.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back"); //will bring user back to the previous page
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be Logged In to do that!");
        res.redirect("back");
    }
}

middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be Logged In to do that!");
    res.redirect("/login");
}



module.exports = middlewareObject;