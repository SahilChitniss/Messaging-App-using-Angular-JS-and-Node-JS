// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mysqlModel = require('mysql-model');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var MyAppModel = mysqlModel.createConnection({
  host     : 'root',
  user     : 'sahil',
  password : 'sahil',
  database : 'test',
});


var Movie = MyAppModel.extend({
    tableName: "candidate",
});


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
//var Movies     = require('./app/public/bear');


router.route('/bear')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var movie = new Movie();      // create a new instance of the Bear model
       movie.firstname = req.body.firstname;  // set the bears name (comes from the request)

        // save the bear and check for error  s
        movie.save(function(err) {
            //if (err)
                //res.send(err);

            res.json({ message: 'Bear created! ' + movie.firstname });
            console.log(movie.firstname);
        });
        
    });
  //res.json({ message: 'hooray! welcome to our bear!' });
//});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);