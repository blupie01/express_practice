// The below allows the use of node
// If you go to the package.json file you will see
// "scripts": {
//   "start": "node ./bin/www"
// The above will look for this file when you type nodemon start in terminal.
// Also you only need to have node in one place for it to know to use node.
// You can do "./bin/www" and as long as this file has #!/usr/bin/env node
// it will run and vise-versa.

#!/usr/bin/env node

// REQUIRED NPM ----------------------------------------------------------
// This will log messages into the console. ("express") is the name of our 
// app which will be displayed before each log in the console.
var debug = require("debug")("express");
// REQUIRED NPM END ------------------------------------------------------

// REQUIRED FILES --------------------------------------------------------
var app = require("../server");
var models = require("../models");
// REQUIRED FILES END ----------------------------------------------------

// SET PORT --------------------------------------------------------------
// Here we use app.set() to set the port. 
// env is a property of app.set() and stands for environment.
// process.env.PORT is looking for the port the enviroment is running on
// and if none is found, it will default to port 3000.
// This is the default: 
// 		process.env.NODE_ENV (NODE_ENV environment variable) or 
// 		“development” if NODE_ENV is not set.
app.set("port", process.env.PORT || 3000);
// SET PORT END ----------------------------------------------------------

// 