var express = require("express");
var router  = express.Router();
var Event = require("../models/event");
var middleware = require("../middleware");




//INDEX ROUTE
router.get("/", function(req, res){
    //Get all events from DB            
    Event.find({}, function(err, party){
       if(err){
           console.log(err);
       } else {
          res.render("events/index",{Events: party});
       }
    });
});


//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    //Get data from form and add it to events array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newEvent = {name: name, image: image, description: desc, price: price, author: author}
    // Create a new campground and save to DB
    Event.create(newEvent, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/events");
        }
    });
});


//Part of POSTing a New Event (NEW Route)
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("events/new"); 
});


//SHOW ROUTE
router.get("/:id", function(req, res){
    //Find the Event with provided ID
    Event.findById(req.params.id).populate("comments").exec(function(err, foundEvent){
    //we retrieve event by its id and then populate this object with comments, and then execute the proces, so we can see comments on description page
        if(err){
            console.log(err);
        } else {
            console.log(foundEvent)
            //render show template with that campground
            res.render("events/show", {event: foundEvent});
        }
    });
});


//EDIT ROUTE
router.get("/:id/edit", middleware.checkEventOwner, function(req, res){
    Event.findById(req.params.id, function(err, foundEvent){
        if(err){
            res.redirect("/events");
        } else {
            res.render("events/edit", {event: foundEvent});     //{event: .. < event goes to views/events/edit.ejs, form action="/events/<% (here> event._id <here)"      
        }
    });
});




//UPDATE ROUTE
router.put("/:id", middleware.checkEventOwner, function(req, res){
   //find and update the correct event
   Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedEvent){
       if(err){
            res.redirect("/events");          
       } else {
            res.redirect("/events/" + req.params.id);
       }
   });
   //redirect to show page
});


//DESTROY (DELETE) ROUTE
router.delete("/:id", middleware.checkEventOwner, function(req, res){
   Event.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/events");
      } else {
          res.redirect("/events");
      }
   });
});



module.exports = router;
