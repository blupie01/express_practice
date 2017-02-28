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

// VIEW ENGINE SETUP -----------------------------------------------
// Assigns setting name to value, where name is one of the properties 
// from the app settings table. 
// **Link: https://expressjs.com/en/api.html#app.settings.table**
// EX. Retrieve the value of a setting with app.get().
// app.set('property', 'My Site');
// app.get('property'); // "My Site"
//
// We use "views" as the "property" to do the following: 
// A directory or an array of directories for the application's views. 
// If an array, the views are looked up in the order they occur in the 
// array.
//
// We use path.join(__dirname, "views") as the 'My Site'.
// Use NPM package path to direct to views folder.
app.set("views", path.join(__dirname, "views"));
// VIEW ENGINE SETUP END -------------------------------------------

//------------------------------------------------------------------
// HANDLEBARS SETUP ------------------------------------------------
// REQUIRE express-handlebars NPM ----------------------------------
var exphbs = require("express-handlebars");
// app.engine(ext, callback)
// Registers the given template engine (handlebars is a templating engine)
// callback as ext. By default, Express will require() the engine 
// based on the file extension. For example, if you try to render 
// a “foo.pug” file, Express invokes the following internally, and 
// caches the require() on subsequent calls to increase performance.
// **NOTE: because we set up the engine in the above app.set() it 
// allows us to use defaultLayout: "main" instead of typing out the
// entire path to ./views/layouts/main.hbs**
// *****I am assuming the engine is going through all folders
// to find the main.hbs file******
app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
// View Engine: The default engine extension to use when omitted.
app.set("view engine", "handlebars");
// HANDLEBARS SETUP END --------------------------------------------
//------------------------------------------------------------------

//------------------------------------------------------------------
// APP.USE SECTION -------------------------------------------------
// **INFO for app.use in below line**
// ****LINK: https://expressjs.com/en/api.html#app.use****

// sets the favicon in your web tab
// we don't have an icon so commented out
// app.use(favicon(__dirname + "/public/favicon.ico"));

// logger is the Morgan NPM package
// DEV argument: Concise output colored by response status for 
// development use. The :status token will be colored red for 
// server error codes, yellow for client error codes, 
// cyan for redirection codes, and uncolored for all other codes.
app.use(logger("dev"));

// bodyParser.json(): Parses the text as JSON and exposes the 
// resulting object on req.body. Only after setting the req.body to 
// the desirable contents will it call the next middleware in the stack, 
// which can then access the request data without having to think about 
// how to unzip and parse it.
app.use(bodyParser.json());

// Extended: true is the default value for this middleware in express.
// So, what's the use of this middleware. Here, when you fire POST 
// request it gets encoded in form of object that only contains 
// {key:value} pairs only or can contain a simple string in json 
// format only.
// Extended: false tells express that url can contain any 
// format/type of file in url.
// **NOTE: extended option allows to choose between parsing the 
// URL-encoded data with the querystring library (when false) or the 
// qs library (when true).**
app.use(bodyParser.urlendcoded({ extended: false }));

// Enable use of cookie-parser NPM
app.use(cookieParser());

// App.use registers middleware. Express.static is a middleware function. 
// Basically it's used to define which assets your server should make 
// publicly available to the user. So anything the user needs to see 
// or interact with by default. The front end of your app. 
// Props to Chris Eckenrode
app.use(express.static(path.join(__dirname, "public")));

// Format app.use("path", "callback")
// The following set paths and the controllers to use on said path
// All four "callbacks" have their file paths set on lines 52 - 55
app.use("/", application_controller);
app.use("/users", users_controller);
app.use("/people", people_controller);
app.use("/people", tasks_controller);

//------------------------------------------------------------------
// ERROR HANDLING --------------------------------------------------
// ****EXPLANATIONS:
// 		Link 1: http://stackoverflow.com/questions/13133071/express-next-function-what-is-it-really-for
//		Link 2: http://stackoverflow.com/questions/7151487/error-handling-principles-for-node-js-express-js-applications/7151775#7151775
// 		Props to Pavan for links
// Catch 04 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error handler
// No stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: (app.get("env") === "development") ? err : {}
	});
});
// ERROR HANDLING END ----------------------------------------------
//------------------------------------------------------------------
// APP.USE SECTION END ---------------------------------------------
//------------------------------------------------------------------

// Export express --------------------------------------------------
module.exports = app;