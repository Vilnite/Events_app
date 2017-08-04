var mongoose    = require("mongoose"),
    Event       = require("./models/event"),
    Comment     = require("./models/comment")


var data = [
        {
            name: "Event 1", 
            image: "https://source.unsplash.com/t3dPPL9016E",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut lobortis justo. Nam ac justo cursus, euismod neque in, suscipit sem. Donec sed pulvinar nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sit amet turpis eu orci hendrerit dictum quis vel erat. Morbi vel neque ut elit posuere pellentesque id vitae dolor. Ut laoreet at quam et dignissim. Maecenas imperdiet tellus sem, pharetra faucibus erat euismod nec. Etiam quis interdum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In placerat vitae velit eget iaculis. Nulla sed odio vitae turpis ullamcorper ultrices a eget metus. Aliquam erat volutpat."
        },
        {
            name: "Event 2", 
            image: "https://source.unsplash.com/oLPo2Rt4mzs",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut lobortis justo. Nam ac justo cursus, euismod neque in, suscipit sem. Donec sed pulvinar nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sit amet turpis eu orci hendrerit dictum quis vel erat. Morbi vel neque ut elit posuere pellentesque id vitae dolor. Ut laoreet at quam et dignissim. Maecenas imperdiet tellus sem, pharetra faucibus erat euismod nec. Etiam quis interdum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In placerat vitae velit eget iaculis. Nulla sed odio vitae turpis ullamcorper ultrices a eget metus. Aliquam erat volutpat."
        },
        {
            name: "Event 3", 
            image: "https://source.unsplash.com/d1fDmShBtIk",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut lobortis justo. Nam ac justo cursus, euismod neque in, suscipit sem. Donec sed pulvinar nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sit amet turpis eu orci hendrerit dictum quis vel erat. Morbi vel neque ut elit posuere pellentesque id vitae dolor. Ut laoreet at quam et dignissim. Maecenas imperdiet tellus sem, pharetra faucibus erat euismod nec. Etiam quis interdum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In placerat vitae velit eget iaculis. Nulla sed odio vitae turpis ullamcorper ultrices a eget metus. Aliquam erat volutpat."  
        }
    ]


function seedDB(){
    //Remove ALL Events
    Event.remove({}, function(err){
        if(err){
            console.log(err);
         }
        console.log("Removed Events!");
    //Add new Events
        data.forEach(function(seed){
         Event.create(seed, function(err, event){
             if(err){
                 console.log(err);
             } else {
                 console.log("Added an Event!");
                 //Add few Comments
                 Comment.create(
                    {
                     text: "This sounds just Great!",
                     author: "Linda"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            event.comments.push(comment);
                            event.save();
                            console.log("Created a new comment!");
                        }
                    }
                 );
             }
        });
    });
});
}

module.exports = seedDB;