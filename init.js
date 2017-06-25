var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var mongoUrl = 'mongodb://localhost:27017/myproject';

module.exports = function(cb) {
var module = {};
MongoClient.connect(mongoUrl, function(err, _db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  this.db = _db;
  cb()
  
  // global.db = _db;
});


}



