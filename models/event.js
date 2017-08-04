var mongoose = require("mongoose");

//SCHEMA SETUP
var eventSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   price: String,
   author: {
     id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     },
     username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});


module.exports = mongoose.model("Event", eventSchema);
