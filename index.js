var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    port = 5000,
    fetch = require('fetch');    

mongoose.connect('mongodb://localhost/bhyve_help', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);


//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(methodOverride("_method"));

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

        Blog.find({'display': true, "products": "WT15"}, function(err, wt15){
            if(err){
                console.log(err);
            } else {
                blogswt15 = wt15;
            };

            Blog.find({'display': true, "products": "General"}, function(err, general){
                if(err){
                    console.log(err);
                } else {
                    blogsGen = general;
                };

                Blog.find({'display': true, "products": "WT25"}, function(err, wt25){
                    if(err){
                        console.log(err);
                    } else {
                        blogswt25 = wt25;
                    };

                    Blog.find({'display': true, "products": "HT25"}, function(err, ht25){
                        if(err){
                            console.log(err);
                        } else {
                            blogsht25 = ht25;
                        };

                        Blog.find({'display': true, "products": "Hub"}, function(err, hub){
                            if(err){
                                console.log(err);
                            } else {
                                blogsHub = hub;
                            };

    res.render("help", {blogs: blogs, blogswt15:blogswt15, blogsGen:blogsGen, blogswt25:blogswt25, blogsht25:blogsht25, blogsHub:blogsHub});
});});});});});});});
        
//NEW ROUTE
app.get("/help/new", function(req, res){
    res.render('new');
});

//POST ROUTE
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/help");
        }
    })
});

//SHOW INDIVIDUAL POST ROUTE
app.get("/help/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
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
            res.render("edit", {blog:foundBlog});
        }
    });
});

//UPDATE ROUTE
app.put("/help/:id", function(req, res){
    Blog.findOneAndUpdate({_id: req.params.id}, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/help/" + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/help/:id", function(req, res){
//DESTORY BLOG
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/help");
        }
    });
});


app.listen(port, () => console.log(`bhyve_help APP IS NOW RUNNING ON PORT ${port}`));
