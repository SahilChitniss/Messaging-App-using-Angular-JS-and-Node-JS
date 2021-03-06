// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();
    var mysql = require("mysql");
    var rest=require("./rest.js");
//    var md5=require("md5");
    var session = require("express-session")

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sahil",
  database: "dbtest"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }


  console.log('Connection established');
});
app.use(express.static('public'));

  var router = express.Router();
    app.use('/api',router);
    var rest_router=new rest(router,con,session);

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
