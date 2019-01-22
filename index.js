var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    port = 5000;

mongoose.connect('mongodb://localhost/bhyve_help', { useNewUrlParser: true });

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE MODEL CONFIG
var helpSchema = new mongoose.Schema({
    question: String,
    answer: String,
    date: {type: Date, default: Date.now},
    display: Boolean
});

var Blog = mongoose.model("Blog", helpSchema);

//ROUTES
//this may need to be taken out if it's causing redirect problems. 
app.get("/", function(req, res){
    res.redirect("/help")
});

app.get("/help", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("help", {blogs: blogs});
        };
    })    
})

app.listen(port, () => console.log(`bhyve_help APP IS NOW RUNNING ON PORT ${port}`));
