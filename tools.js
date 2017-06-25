var prompt = require('prompt');
const chalk = require('chalk');
var NodeGeocoder = require('node-geocoder');
var async = require('async');
var ObjectID = require('mongodb').ObjectID
var options = {
  provider: 'google',
 
  // Optional depending on the providers 
  httpAdapter: 'https', // Default
  apiKey: "AIzaSyAta-nxHNks1zjyUSOsCA7N4uZsd4Ocoyw",
  formatter: null         // 'gpx', 'string', ... 
};
var geocoder = NodeGeocoder(options);


const dbutil = require('./dbutil');
var db;

exports.inputHandler = function(database){
	db = database;
	prompt.get(['command'], function (err, result) {
		// 
		// Log the results. 
		// 
		if (result.command == 'kill' ){
			kill('process quit');
		} else if (result.command == 'clean locations'){
			cleanLocations(db);
		}
		exports.inputHandler(database);
	});
};

exports.createObject = function(scrape, cb){
	var id = (scrape["id"])
	var pill = { id : id, title : scrape["table"][0]["title"]};
	var columns = scrape["table"][0]["columns"]

	for( var x = 3; x < columns.length - 2; x ++ ){
		 	var key = columns[x]["key"].replace(/:\s*?$/, '').replace(/ |\//g, "_").toLowerCase().replace("colour", "color");

		 	// Keep description and reports uppercase
		 	if(key == "description" || key == "user_report"){
		 		var value = columns[x]["value"]
		 	}else if(key == "date_submitted"){
		 		var value = new Date(columns[x]["value"])
		 	} else{
		 		var value = columns[x]["value"].toLowerCase()
		 	}
		 	
		 	pill[key] = value;

	}
	cb(pill);
}


var kill = function(quitMsg){
    console.error(quitMsg)
    process.exit(1);
}

var cleanLocations = function(database){
	var q = async.queue(function(doc, callback) {
		// console.log(doc._id)
		geocoder.geocode(
	  				doc.state_province + ", North America",
				 	function(err, res){
				 		try{
				 			assert.equal(err,null)
				 		if(res.length > 0){

				 			try{
					 		// console.log(res);
	  						database.collection('pills').update(
	  							{_id : new ObjectID(doc._id)}, 
	  							{$set : {"locationLong" : res[0]["administrativeLevels"]["level1long"], "locationShort" : res[0]["administrativeLevels"]["level1short"]}
	  						}, function(err, res){
	  							assert.equal(err,null);
	  							console.log(chalk.green("Item location changed"))
	  						});
		  				 	} catch(err){
					 			console.log(err)
					 		};

				 		} else {
				 			console.log(doc.state_province + ", North America")
				 		}
	  				 	} catch(e){
	  				 		console.log(e)
	  				 	}
				 	});
	setTimeout(function(){callback()},200);
	}, 1);
	cursor = db.collection('pills').find({"locationLong": null})
	// count = db.collection('pills').count()
	// console.log(count)
	cursor.each(function(err, doc){
		if (err) throw err;
		if (doc) q.push(doc);
		// console.log(doc);
	});

	q.drain = function() {
		if(cursor.isClosed()) {
			console.log('All entries location have been cleaned')
		}
	}

}


