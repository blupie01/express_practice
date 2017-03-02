// REQUIRED NPM ----------------------------------------------------------
var express = require("express");
// REQUIRED NPM END ------------------------------------------------------

// REQUIRED FILES --------------------------------------------------------
// This is not required. We don't use it here.
// Confirmed with Pavan
// var models = require("../models");
// REQUIRED FILES END ----------------------------------------------------

// REQUIRED ROUTER -------------------------------------------------------
// Creates a router object
// **Link1: https://expressjs.com/en/api.html#express.router**
var router = express.Router();
// REQUIRED ROUTER END ---------------------------------------------------

// USING ROUTER TO PATH WHEN CONTROLLER IS CALLED ------------------------
// router.METHOD(path, [callback, ...] callback)
// The router.METHOD() methods provide the routing functionality in Express, 
// where METHOD is one of the HTTP methods, such as GET, PUT, POST, and so on, 
// in lowercase. Thus, the actual methods are router.get(), router.post(), 
// router.put(), and so on.
// **Link1: https://expressjs.com/en/api.html#router**


// Export router ---------------------------------------------------------
module.exports = router;