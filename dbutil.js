assert = require('assert');

module.exports = {
  insertPills : function (db, pills, callback) { insertPills(db, pills, callback) },
  insertPill : function (db, pill, callback) { insertPill(db, pill, callback) },
  findPills : function (db, callback) { findPills(db, callback) },
  updatePill : function (db, callback) { updatePill(db, callback) },
  indexCollection : function (db, callback) { indexCollection(db, callback) }

}

// var insertPills = function(db, pills, callback) {
//   // Get the Pills collection
//   var collection = db.collection('Pills');
//   // Insert some Pills
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 Pills into the collection");
//     callback(result);
//   });
// }

var insertPill = function(db, pill, callback) {
  // Get the Pills collection
  var collection = db.collection('pills');

  collection.find({"id" : pill.id}).toArray(function(err, result){
    assert.equal(err, null);
    // console.log(result[0].id + " ------ " + pill.id)
    if(result.length < 1){
      collection.insertOne( pill, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        // console.log("Inserted Pill(" + pill.id + ") into the collection pills");
        callback(result);
      });
    // console.log("pill inserted")
    } else {
      console.log("Pill ID: " + pill.id + " already in DB!");
    }
  });
    }


var findPills = function(db, callback) {
  // Get the Pills collection
  var collection = db.collection('pills');
  // Find some Pills
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });      
}

var updatePill = function(db, callback) {
  // Get the Pills collection
  var collection = db.collection('Pills');
  // Update Pill where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the Pill with the field a equal to 2");
    callback(result);
  });  
}

var indexCollection = function(db, callback) {
  db.collection('Pills').createIndex(
    { "a": 1 },
      null,
      function(err, results) {
        console.log(results);
        callback();
    }
  );
};