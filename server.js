// Depenencies
var express = require("express");
var mongoose = require("mongoose");

// Scraping Tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios"); // make an http request with the call
var cheerio = require("cheerio"); // web scraper when a site doesn't have an API or when you don't want to go
// through the process of connecting to the api and making calls

// Requiring Models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Connect to MongoDB

// Mongoose to MongoDB connection
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// ROUTES
/**
 *
 * pick a new site
 * read html for where stories are contained
 * use cheerio to load that page via url
 * search for the element that contains stories
 *
 */
// Get request for getting articles from the NYT website
app.get("/scrape", function(req, res) {
  console.log("IN SCRAPE ROUTE");
  axios.get("http://www.medium.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    console.log(response.data);
    $("article").each(function(i, element) {
      var scrapeResult = {};
      console.log(element);

      // adding the text and href of every link on the nytimes website and saving them as properties

      scrapeResult.title = $(this)
        .children("a")
        .text();
      scrapeResult.link = $(this)
        .children("a")
        .attr("href");

      console.log(scrapeResult);

      //   create a new Article using the 'scrapeResult' object created from scraping

      //   db.Article.create(scrapeResult)
      //     .then(function(dbArticle) {
      //       console.log(dbArticle);
      //     })
      //     .catch(function(err) {
      //       console.log(err);
      //     });
    });

    res.send("Your Scrape is Complete!");
  });
});

// Get request for grabbing the articles from the database
app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Starting server
app.listen(PORT, function() {
  console.log("listening on port " + PORT);
});

//client -> send request on page load-> server -> scrappes website -> stored db -> send client articles
