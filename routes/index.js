var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {CAPTCHA: ''});
});

router.get('/#contact', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/sent', function(req, res, next) {
  res.render('sent');
});

module.exports = router;