//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

// connecting to mongodb and creating a database
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

// creating three dafualt posts:
const item1 = new Post({
  title: "home",
  content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});

const item2 = new Post({
  title: "about",
  content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});

const item3 = new Post({
  title: "contact",
  content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});

const itemSchema = {
  title: String,
  content: String
};

const Item = mongoose.model("Item", itemSchema);

// first step: to create a preferrable schema
const postSchema = {
  title: String,
  content: String
};

// second step: to create a model to add new documents 
const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {

      Item.find({
        title: "home"
      }, function (err, foundDefaultItems) {
        if (foundItems === 0) {
          Post.insertMany([post1], function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully saved home text into home");
            }
          });

          Post.find({}, function (err, foundUserItems) {
            if (foundUserItems != 0) {
              res.render("home", {
                homeText: foundDefaultItems.content,
                posts: foundUserItems
              });
            } else {
              res.render("home", {
                homeText: foundUserItems.content,
                posts: []
              });
            }
          });
        } else {
          Post.find({}, function (err, foundUserItems) {
            if (foundUserItems != 0) {
              res.render("home", {
                homeText: foundDefaultItems.content,
                posts: foundUserItems
              });
            } else {
              res.render("home", {
                homeText: foundUserItems.content,
                posts: []
              });
            }
          });
        }
      });

      app.get("/contact", function (req, res) {
        res.render("contact", {
          contactText: contactContent
        });
      });

      app.get("/about", function (req, res) {
        res.render("about", {
          aboutText: aboutContent
        });
      });

      app.get("/compose", function (req, res) {
        res.render("compose", {});
      });

      // to get what the user is typing in the compose box
      app.post("/compose", function (req, res) {
            const post = new Post({
              title: req.body.titleText,
              content: req.body.bodyText
            });
            // posts.push(post);
            post.save(function (err) {
              if (!err) {
                res.redirect("/");
              }
            });
            app.get("/posts/:topic", function (req, res) {
                  Post.find({}, function (err, foundItems) {
                    if (err) {
                      console.log(err);
                    } else {
                      foundItems.forEach(function (element) {
                        let x = element.title;
                        let y = req.params.topic;
                        if (_.kebabCase(x) === _.kebabCase(y)) {
                          res.render("post", {
                            postHeading: element.title,
                            postContent: element.content
                          });
                        }
                      });
                    }
                  });

                  app.listen(3000, function () {
                    console.log("Server started on port 3000");
                  });