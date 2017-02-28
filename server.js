// REQUIRED NPM PACKAGES -------------------------------------------
// Express 3.x is a light-weight web application framework to help 
// organize your web application into an MVC architecture on the 
// server side. 
var express = require("express");
//------------------------------------------------------------------
// Saves time from typing out paths. 
// Allows path.join(__dirname, **path**)
var path = require("path");
//------------------------------------------------------------------
// User agents request favicon.ico frequently and indiscriminately, 
// so you may wish to exclude these requests from your logs by using 
// this middleware before your logger middleware.
// This module caches the icon in memory to improve performance by 
// skipping disk access.
// This module provides an ETag based on the contents of the icon, 
// rather than file system properties.
// This module will serve with the most compatible Content-Type.
var favicon = require("serve-favicon");
//------------------------------------------------------------------
// Morgan is used for logging request details.
var logger = require("morgaon");
//------------------------------------------------------------------
// The cookie parser parses cookies and puts the cookie information on 
// req object in the middleware. It will also decrypt signed cookies 
// provided you know the secret.
var cookieParser = require("cookie-parser");
//------------------------------------------------------------------
// body-parser will take the body of your request and parse it to 
// whatever you want your server to receive in POST/PUT requests 
// (JSON, URL encoded, text, raw).
// The only problem with body-parser (the far I know) is that you 
// can't handle multipart bodies (which are commonly uploads).
// Appears in req.body.
var bodyParser = require("body-parser");
//------------------------------------------------------------------
// This module now directly reads and writes cookies on req/res. 
// **USING COOKIE-PARSER MAY RESULT IN ISSUES IF THE SECRET IS NOT THE 
// SAME BETWEEN this MOduLE AND COOKIE-PARSER.**
// Session data is not saved in the cookie itself, just the session ID. 
// Session data is stored server-side.
var session = require("express-session");
//------------------------------------------------------------------
// Lets you use HTTP verbs such as PUT or DELETE in
// places where the client doesn't support it.
var methodOverride = require("method-override");
//------------------------------------------------------------------
// REQUIRED NPM PACKAGES END ---------------------------------------
//------------------------------------------------------------------

// REQUIRED CONTROLLERS --------------------------------------------
var application_controller = require("./controllers/application_controller");
var tasts_controller = require("./controllers/tasks_controller");
var people_controller = require("./controllers/people_controller");
var users_controller = require("./controllers/users_controller");
// REQUIRED CONTROLLERS END ----------------------------------------

// set a var to hold path to express package
var app = express();

// METHOD OVERRIDE--------------------------------------------------
// allows DELETE and PUT to be used in place of POST
app.use(methodOverride("_method"));
// SPECIAL NOTE: override with different headers; last one takes precedence
// app.use(methodOverride('X-HTTP-Method'))          // Microsoft
// app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
// app.use(methodOverride('X-Method-Override'))      // IBM
// METHOD OVERRIDE END ---------------------------------------------

// ALLOW SESSIONS --------------------------------------------------
// SECRET: used to sign the session ID cookie. This can be either a 
// STRING for a single secret, or an ARRAY of multiple secrets. 
// If an array of secrets is provided, only the first element will be 
// used to sign the session ID cookie, while all the elements will be 
// considered when verifying the signature in requests.
// 
// COOKIE: Settings object for the session ID cookie. 
// The default value is 
// { path: '/', httpOnly: true, secure: false, maxAge: null }.
//
// MAXAGE: Specifies the number (in milliseconds) to use when 
// calculating the Expires Set-Cookie attribute. This is done by taking 
// the current server time and adding maxAge milliseconds to the value 
// to calculate an Expires datetime. By default, no maximum age is set.
// **Note If both expires and maxAge are set in the options, then the last 
// one defined in the object is what is used.**
app.use(session({ secret: "app", cookie: { maxAge: 60000 }}));
// ALLOW SESSIONS END ----------------------------------------------

// ALLOW COOKIE-PARSER ---------------------------------------------
app.use(cookieParser());