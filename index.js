// Dependencies
const express = require('express');
const process = require('process');
const prompt = require('prompt');
const scrapeIt = require("scrape-it");
const chalk = require('chalk');
const _util = require('util');
const app = express();

// Modules
const init = require('./init');
const tools = require('./tools');
const dbutil = require('./dbutil');



init(function(){





// Start Command Prompt Input Handler
prompt.start();
tools.inputHandler(db)

var pillReportUrlStart = "http://www.pillreports.net/index.php?page=search_reports&sent=1&region="
var region = { "North America" : 1, "Europe" : 2, "Australia" : 3, "South America" : 4, "Africa" : 5, "Asia" : 6, "Middle East" : 7}
var page = 1;
var ppage = 100;
var count = 0;
var isMore = true;

// var scrapeOnce = function(){
// 	scrapeIt( pillReportUrlStart + region["North America"] + "&pnum=" + page + "&pp=" + ppage , {
// 	pills: {
// 		listItem: ".contentBlock > table"
// 	  , data:{
// 				url: {
// 					selector: "a",
// 					attr: "href"
// 				}
// 			}
// 	},
// 	alert: ".alertText",
// }, (err, result) => {
// 	var pills = result["pills"];
// 	page += 1;


// 	if(result["alert"] == ""){
// 		setTimeout(function(){scrapeOnce()}, 2000);
// 	} else{console.log(result["alert"])}

// 	count += ppage;
// 	console.log("Processing last " + chalk.green(ppage) + " of  " + chalk.red(count) + " entries.")
// 	for( x in pills) {
// 		var url = "http://www.pillreports.net/" + pills[x].url;
// 		scrapeIt( url , {
// 			table: {
// 					listItem: ".standardTable"
// 				  , data:{
// 						columns: {
							
// 							listItem: "tr",
// 							data: {
// 								key: {
// 									selector: "td",
// 									eq: 0
// 								},
// 								value: {
// 									selector: "td",
// 									eq: 1
// 								}
// 							}
// 						},
// 					title: "span.textLargeBlue"
// 					}
// 		   },
// 		   id: {
// 					selector: "td > a",
// 					attr: "href",
// 					convert: x => x.substr(x.lastIndexOf('=') + 1)
// 				}

// 		}, (err, pill) => {
// 			try{
// 				tools.createObject(pill, function(ob){
// 					// dbutil.insertPill(db, ob, function(result){})
// 				});
// 			} catch(e){
// 				console.log(e);
// 			}
			
// 		});
// 	}			
// })
	
// }
// scrapeOnce();




console.log('This process is pid ' + process.pid)


 
app.listen(3000)

})