// Depenencies
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");

// Scraping Tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios"); // make an http request with the call
var cheerio = require("cheerio"); // web scraper when a site doesn't have an API or when you don't want to go
// through the process of connecting to the api and making calls

// Requiring Models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Connect to MongoDB

// Mongoose to MongoDB connection
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

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
app.get("/scrape"),
  function(req, res) {
    axios.get("http://www.newyorktimes.com/").then(function(response) {
      var $ = cheerio.load(response.data);

      $("article h2").each(function(i, element) {
        var article = {};

        article.title = $(this)
          .children("a")
          .text();
        article.link = $(this)
          .children("a")
          .attr("href");
      });
    });
  };
