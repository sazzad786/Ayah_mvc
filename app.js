const express = require("express"); //download express library from npm

const chalk = require("chalk"); //print message in color code
//console.log(chalk.yellow("Program started"));
//console.log(chalk.red("Error while starting program"));
const fs = require("fs");

var products = {};
var isUserLoggedIn = false;

var PORT = process.env.PORT || 8080;

const app = express();

fs.readFile("./data/products.json", function(err, data) {
  products = JSON.parse(data.toString());
});

/* starting server might take few sec **/
//3000 local Port / web port:8080 --->> PORT
app.listen(PORT, function() {
  console.log(chalk.green("Server started listening on port", PORT));
});

//middleware or tunnel
app.use(function(req, res, next) {
  console.log("*** Request received *** : ", new Date());
  next(); // pass request to next handler
  // i want to check whether to next handler
  // i want to check user is logged in or not
  // i want to print request received date for every handler
});

function validateUser(req, res, next) {
  if (isUserLoggedIn) {
    next();
  } else {
    //res.send('User not logged in !');
    res.sendFile(__dirname + "/login.html");
  }
}

/* http://localhost:3000/ */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});

/* http://localhost:3000/login */
app.post("/login", function(req, res) {
  //res.send("<h3>Login Success</h3>");
  isUserLoggedIn = true;
  res.sendFile(__dirname + "/home.html");
});

/* http://localhost:3000/products */
/*app.get("/products", function(req, res) {
  return products;
  */
app.get("/invoice", validateUser, function(req, res) {
  res.download(__dirname + "/data/invoice.pdf");
});

app.get("/products", function(req, res) {
  //res.download(__dirname + "/data/invoice.pdf");
  res.json(products);
});

console.log("**** Program ended ****");
