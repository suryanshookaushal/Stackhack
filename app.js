
//app configuration
var bodyParser = require("body-parser");
var express  = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect("mongodb://localhost/newdata", { useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose model configuration
var formSchema = new mongoose.Schema({
	name: String,
	mobile: Number,
	email: String,
	image: {
		data: Buffer,
		contentType: String
	},
	options: {
		type: String, possibleValues: ['Self','Corporate','Group','Others']
	},
	ticket: Number 
});
var Blog = mongoose.model("Blog", formSchema);




//Routes
app.get("/",function(req, res){
	res.render("index");
});
app.get("/events", function(req, res){
	Blog.find({},function(err, blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("event",{blogs: blogs});
		}
	});
})
app.get("/forms",function(req, res){
	res.render("form");
})
app.get("/success", function(req, res){
	Blog.find({}, function(err, result){
		if(err){
			console.log(err);
		}
		else{
			res.render("success",{blogs: result})
		}
	});
});

app.post("/success", function(req, res){
	// create blogs
	Blog.create(req.body.blog, function(err, newEvent){
		if(err){
			res.render("form");
		}
		else{
			res.redirect("/success");
		}
	})
})

//
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("lets hack and rock");
});


/*
//app configuration
var bodyParser = require("body-parser");
var express  = require('express');
var mongoose = require('mongoose');
var app = express();



mongoose.connect("mongodb://localhost/eventdb", { useNewUrlParser: true, 
				  useUnifiedTopology: true});
app.set("view engine","ejs");
//app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/'));

//Mongoose model configuration
var formSchema = new mongoose.Schema({
	name: String,
	mobile: Number,
	email: String,
	image: {
		data: Buffer,
		contentType: String
	},
	options: {
		type: String, possibleValues: ['Self','Corporate','Group','Others']
	},
	ticket: Number 
});
var Blog = mongoose.model("Blog", formSchema);



//Routes
app.get("/",function(req, res){
	res.render("index");
});

app.get("/forms",function(req, res){
	res.render("form");
});

app.get("/success", function(req, res){
	
	Blog.findById(req.params.id, function(err, foundblogs){
		if(err)
		{
			console.log("ERROR");
		}
		else
		{
			res.render("success", {blogs: foundblogs});
		}
	});
});

app.post("/success", function(req, res){
	// create blogs
	Blog.create(req.body.blog, function(err, newEvent){
		if(err){
			res.render("form");
		}
		else{
			res.redirect("/success");
		}
	})
})

//
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("lets hack and rock");
});*/
