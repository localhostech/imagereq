var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pastec = require ('pastecapi') ({
  'endpoint': "http://localhost:4444"
});
var bot = require('nodemw');
var wiky = require('wiky.js');

var client = new bot({
    protocol: 'https',           // Wikipedia now enforces HTTPS
    server: 'ru.wikipedia.org',  // host name of MediaWiki-powered site
    path: '/w',                  // path to api.php script
    debug: false                 // is more verbose when set to true
  });

var path = require('path'),
    fs = require('fs'),
    util = require('util'),
    multiparty = require('multiparty');

var database;
const inputFolder = './input/';

fs.readFile("./database.json", "utf8", function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
		database = JSON.parse(data);
	}
});

var wikipedia = require("wikipedia-js");

app.use(express.static('assets'));
app.use(express.static('input'));

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.render('index', {images: database});
});

app.post('/', function(req, res) {
	  var form = new multiparty.Form();
 
	    form.parse(req, function(err, fields, files) {
	      //res.writeHead(200, {'content-type': 'text/plain'});
	      //res.write('received upload:\n\n');
	      //res.end(util.inspect({fields: fields, files: files}));
	      console.log(files)
	      if (files['file-0']) {
	      		console.log(files['file-0'][0].path);
	      		pastec.searchIndex (files['file-0'][0].path, showImage);
	  	  } else {
	  	  	res.send('No results');
	  	  }
	    });
	

	function showImage(err, data) {
		console.log(data);
		if (data) {
			if (data.image_ids.length > 0) {
				var imageId = data.image_ids[0];
				console.log(imageId);
				console.log(database[imageId]);
				var wikioptions = {query:  database[imageId].name, format: "html", summaryOnly: true};
				if (!database[imageId].wiki) {
				wikipedia.searchArticle(wikioptions, function(err, htmlWikiText) {
				    if (err) {
				      console.log("An error occurred[query=%s, error=%s]", query, err);
				      return;
				    }
				    console.log(htmlWikiText);
				    database[imageId].wiki = htmlWikiText;
				    res.send(database[imageId]);
				    }
				);
				} else {
					res.send(database[imageId]);
				}
				  
			} else {
				console.log('No results');
				res.send('No results');
			}
				} else {
				console.log('No results');
				res.send('No results');
			} 
	}
});
app.get('/getImage', function(req, res) {
	console.log(req.query);
	//res.send(database[req.query.id]);
	if (!database[req.query.id].wiki) {
		var wikioptions = {query:  database[req.query.id].name, format: "html", summaryOnly: true};
					wikipedia.searchArticle(wikioptions, function(err, htmlWikiText) {
					    if (err) {
					      console.log("An error occurred[query=%s, error=%s]", query, err);
					      return;
					    }
					    console.log(htmlWikiText);
					    database[req.query.id].wiki = htmlWikiText;
					    res.send(database[req.query.id]);
					    }
					);
	} else {
		res.send(database[req.query.id]);
	}
})

app.listen(4400, function () {
  console.log('Example app listening on port 4400!');
});