/**
 * authors: Jan-Patrick Bollow 349891, Jan Tebrügge
 *
 */

var express = require('express');
var router = express.Router();

// I didnt add any logger to my nodejs

// You need to start the page manually
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.sendFile(__dirname + '/page/index.html');
// });

/* GETjson 
   handles GET request 
*/
router.get('/getjson', function (req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Set our collection
  var collection = db.get('layercollection');
  
  // Query from our DB
  collection.find({}, {}, function (e, docs) {
    res.json(docs);
  });
});

/* POSTjson
   Posting json to mongodb
*/
router.post('/postjson', function (req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our geojson, this comes from our drawer
  var geojson = req.body;

  // Set our collection
  var collection = db.get('layercollection');

  // Submit to the DB
  collection.insert({
    geojson
  }, function (err, doc) {
    if (err) {

      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      
      // Or print object id
      res.send(doc._id);
    }
  });
});


// New code using routecollection

/* GETjson 
   handles GET request 
*/
router.get('/getroute', function (req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Set our collection
  var collection = db.get('routecollection');
  
  // Query from our DB
  collection.find({}, {}, function (e, docs) {
    res.json(docs);
  });
});

/* POSTjson
   Posting route to mongodb
*/
router.post('/postroute', function (req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our geojson, this comes from our drawer
  var geojson = req.body;

  // Set our collection
  var collection = db.get('routecollection');

  // Submit to the DB
  collection.insert({
    geojson
  }, function (err, doc) {
    if (err) {

      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      
      // Or print object id
      res.send(doc._id);
    }
  });
});


module.exports = router;