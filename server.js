//Origional
// require("dotenv").config();
var express = require("express");

const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// Initialize Express
var app = express();

var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
users = [];

// var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");
var DB_USER = process.env.DB_USER;
var DB_PASS = process.env.DB_PASS;
var PORT = process.env.PORT || 3100;

// Configure middleware

// Use morgan logger for logging requests
// app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/TheMorningToastBlinds",
  { useNewUrlParser: true }
);

// Routes

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.crazydaysandnights.net/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // console.log(response.data);

    // var postOuter = $(".post-outer").text();
    // console.log(postOuter);

    $(".post").each(function(i, element) {
      var title = $(element)
        .children(".post-title")
        .text();
      // console.log(title);

      var link = $(element)
        .children(".post-title")
        .children("a")
        .attr("href");
      console.log(link);

      var body = $(element)
        .children(".post-body")
        .text();
      // console.log(body);

      if (title && link && body) {
        db.Blinds.create(
          {
            title: title,
            body: body,
            link: link
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            } else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          }
        );
      }
    });
  });
  res.send("Scrape Complete");
});

// Route for getting all Articles from the db
app.get("/blinds", function(req, res) {
  // Grab every document in the Articles collection
  db.Blinds.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//handle the socket
io.sockets.on("connection", function(socket) {
  //new user login
  socket.on("login", function(nickname) {
    if (users.indexOf(nickname) > -1) {
      socket.emit("nickExisted");
    } else {
      //socket.userIndex = users.length;
      socket.nickname = nickname;
      users.push(nickname);
      socket.emit("loginSuccess");
      io.sockets.emit("system", nickname, users.length, "login");
    }
  });
  //user leaves
  socket.on("disconnect", function() {
    if (socket.nickname != null) {
      //users.splice(socket.userIndex, 1);
      users.splice(users.indexOf(socket.nickname), 1);
      socket.broadcast.emit("system", socket.nickname, users.length, "logout");
    }
  });
  //new message get
  socket.on("postMsg", function(msg, color) {
    socket.broadcast.emit("newMsg", socket.nickname, msg, color);
  });
  //new image get
  socket.on("img", function(imgData, color) {
    socket.broadcast.emit("newImg", socket.nickname, imgData, color);
  });
});

// Start the server
server.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
