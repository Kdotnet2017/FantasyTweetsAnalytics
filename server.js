var express=require("express");
var app=express();
var env = require("dotenv").load();
var PORT=process.env.PORT || 5000
var bodyParser = require("body-parser");
// Database connection
//var connection = require("./config/connection.js");

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

//routes
var routes = require("./controllers/appControllers.js");
app.use(routes);

app.listen(PORT,function(){
    console.log("Server is running on PORT : " +PORT);
});
