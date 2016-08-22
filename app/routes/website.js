var express 	= require('express');
var router 		= express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  	console.log('Website hit: ', Date.now());
  	next();
});


router.get('/', function(req, res) {
	res.sendFile('default.html',{ root: __base + '/app'} );
	
});

module.exports = router;