const express = require("express"); //download express library from npm

const chalk = require("chalk"); //print message in color code

const app = express();

console.log(chalk.yellow("Program started"));

console.log(chalk.red("Error while starting program"));

/* starting server might take few sec **/
app.listen(3000, function() {
  console.log(chalk.green("Server started listening on port 3000"));
});

/* http://localhost:3000/ */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});

/* http://localhost:3000/login */
app.post("/login", function(req, res) {
  res.send("<h3>Login Success</h3>");
});

/* http://localhost:3000/products */
app.get("/products", function(req, res) {
  return products;
});

console.log("**** Program ended ****");
