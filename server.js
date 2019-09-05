// Depenencies
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");

// Scraping Tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios"); // make an http request with the call
var cheerio = require("cheerio"); // web scraper when a site doesn't have an API or when you don't want to go
// through the process of connecting to the api and making calls

// Mongoose to MongoDB connection
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

/**
 * 
 * pick a new site
 * read html for where stories are contained
 * use cheerio to load that page via url
 * search for the element that contains stories
 * 
 */
