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

// SEQUELIZE -------------------------------------------------------------
// Sync all defined models to the DB.
// More info here:
// **Link: http://sequelize.readthedocs.io/en/latest/api/sequelize/#sync**
// For all models in the models folder we are syncing our database so we
// can use the data later. Then...
models.sequelize.sync().then(function() {
	// app.listen(port, [hostname], [backlog], [callback])
	// Not using [hostname] and [backlog].
	// Binds and listens for connections on the specified port.
	// **Link: https://expressjs.com/en/api.html#app.listen**
	// Here we are setting variable server to use express to get the 
	// port express is using and using a callback to... 
	var server = app.listen(app.get("port"), function() {
		// Use debug to console.log the port we are using.
		// ADDRESS().PORT ------------------------------------------------
		// ****IMPORTANT: address() is a node.js method.****
		// Returns the bound address, the address family name, and port of 
		// the server as reported by the operating system. Useful to find 
		// which port was assigned when getting an OS-assigned address. 
		// Returns an object with port, family, and address properties: 
		// 		ex. { port: 12346, family: 'IPv4', address: '127.0.0.1' }
		// **Link: https://nodejs.org/api/net.html#net_server_address**
		debug("Express server listening on port " + server.address().port);
		// ADDRESS().PORT END --------------------------------------------
	});
});
// SEQUELIZE END ---------------------------------------------------------