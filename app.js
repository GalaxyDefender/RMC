/**
 * Created by shane on 3/9/15.
 */
//var CONFIG = require('./config/config.js');
//var CONFIG;
//var SETINGS;

global.__base = __dirname + '/';

var Q               = require('q');
var express         = require('express'); 			// call express
var cors	       	= require('cors');				// call cors
var bodyParser  	= require('body-parser');		// call body-parser
var http            = require('http');
var path            = require('path');

var app	= express();
app.use(cors());
// Use parsing to extract JSON object from POST requests
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json( {limit: '50mb'} ));

app.use(express.static(path.join(__dirname, 'app')));

var website = require('./app/routes/website');
app.use('/',website);

var server = http.createServer(app);
server.listen(8080);




