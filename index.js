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
    Blog.find({'display': true}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            blogs = blogs;
        };

        Blog.find({'display': true, "products.cat": "wt15"}, function(err, wt15){
            if(err){
                console.log(err);
            } else {
                blogswt15 = wt15;
            };

            Blog.find({'display': true, "products.cat": "general"}, function(err, general){
                if(err){
                    console.log(err);
                } else {
                    blogsGen = general;
                };

                Blog.find({'display': true, "products.cat": "wt25"}, function(err, wt25){
                    if(err){
                        console.log(err);
                    } else {
                        blogswt25 = wt25;
                    };

                    Blog.find({'display': true, "products.cat": "ht25"}, function(err, ht25){
                        if(err){
                            console.log(err);
                        } else {
                            blogsht25 = ht25;
                        };

                        Blog.find({'display': true, "products.cat": "hub"}, function(err, hub){
                            if(err){
                                console.log(err);
                            } else {
                                blogsHub = hub;
                            };

    res.render("help", {blogs: blogs, blogswt15:blogswt15, blogsGen:blogsGen, blogswt25:blogswt25, blogsht25:blogsht25, blogsHub:blogsHub});
});});});});});});});

            

//WT15 ROUTE
// app.get("/help", function(req, res){
//     Blog.find({"products.subcat": "WT15"}, function(err, blogsw){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("help", {blogsw: blogsw});
//         };
//     });
// });

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

//SHOW INDIVIDUAL POST ROUTE
app.get("/help/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/help");
        } else { 
            res.render("show", {blog: foundBlog})
        }
    })
});

//EDIT ROUTE
app.get("/help/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/help");
        } else {
            // console.log(foundBlog);
            console.log(foundBlog.products);
            res.render("edit", {blog:foundBlog});
        }
    });
});

app.listen(port, () => console.log(`bhyve_help APP IS NOW RUNNING ON PORT ${port}`));
