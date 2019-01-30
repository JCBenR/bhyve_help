var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    port = 5000,
    fetch = require('fetch');    

mongoose.connect('mongodb://localhost/bhyve_help', { useNewUrlParser: true });

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


//MONGOOSE MODEL CONFIG
var helpSchema = new mongoose.Schema({
    products: Array,
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

//INDEX ROUTE
app.get("/help", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("help", {blogs: blogs});
        };
    })    
})

//NEW ROUTE
app.get("/help/new", function(req, res){
    res.render('new');
});

//POST ROUTE
app.post("/help/new", function(req,res){
    console.log('res body:', res.body);
    console.log('req body:', req.body);
    res.send({
        type: "POST",
        title: req.body.title,
        live: req.body.live
    });
    let newPost = new Blog({
        products: req.body.categories,
        question: req.body.title,
        answer: req.body.body,
        display: req.body.live
    });
    newPost.save();
});

app.listen(port, () => console.log(`bhyve_help APP IS NOW RUNNING ON PORT ${port}`));
