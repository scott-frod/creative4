var express = require('express');
var fs = require('fs');
var https = require('https');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root:  'public' });
});

router.get('/getcity',function(req,res,next) {
  console.log("In getcity route");

  fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
    if(err) throw err;
    var myRe = new RegExp("^" + req.query.q);
    console.log(myRe);
    var cities = data.toString().split("\n");
    var jsonresult = [];

    for(var i = 0; i < cities.length; i++) {
      var result = cities[i].search(myRe);

        if(result != -1) {
          console.log(cities[i]);
          jsonresult.push({city:cities[i]});
      }
  }

  console.log(jsonresult);
  res.status(200).json(jsonresult);
  });
});

router.get('/word', function(req, res){
	var url = "https://owlbot.info/api/v1/dictionary/" + req.query.w + "?format=json";
	
	https.get(url,function(owl){
	owl.pipe(res);
	});
});


module.exports = router;
