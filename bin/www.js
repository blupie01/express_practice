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
// waiting for pavan or chris
var debug = require("debug")("express")

// REQUIRED FILES --------------------------------------------------------
var app = require("../server");
var models = require("../models");
// REQUIRED FILES END ----------------------------------------------------

// NOT DONE YET