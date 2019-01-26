//Origional

// require("dotenv").config();
var express = require("express");
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

// Initialize Express
var app = express();

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
      console.log(title);

      var body = $(element)
        .children(".post-body")
        .text();
      console.log(body);

      if (title && body) {
        db.Blinds.create(
          {
            title: title,
            body: body
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

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
