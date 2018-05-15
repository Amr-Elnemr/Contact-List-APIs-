var express = require("express");
var server = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//DB config.:
mongoose.connect("mongodb://localhost:27017/MyContacts");

//Model call:
require('./Models/contacts');

//Controller call:
var contactRouter = require("./Controllers/contacts");
server.use("/contacts",contactRouter);

//server state:
server.listen(9999,function(){
  console.log("Server started ...");
});
