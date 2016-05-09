var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var nodemailer = require('nodemailer');
var https = require('https');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
// app.engine('html', cons.swig);
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', function(req,res){
  var mailOpts, smtpTrans;

  var googleResponse = "";
  var SECRET = "6LfoDx8TAAAAAJEfLEqpK88UWY1yJb6NMwfkSll7"; //secret key from google catcha

  // Display's message when user didn't use CAPTCHA
  if(req.body["g-recaptcha-response"] === undefined || req.body["g-recaptcha-response"] === '' || req.body["g-recaptcha-response"] === null){
    return res.render('includes/contact');
  }

  // This code figures out the CAPTCHA
  var httpsReq = https.request('https://www.google.com/recaptcha/api/siteverify' + '?secret=' + SECRET + '&response=' + req.body["g-recaptcha-response"], function(httpsRes){
    httpsRes.on("data", function(chunk){
      googleResponse += chunk;
    });
    httpsRes.on("end", function(){
      res.render('includes/contact');
    });
  });

  httpsReq.on("error", function(err){
    res.send("Error:" + JSON.stringify(err));
  });

  httpsReq.end();

  // mail options settings
  mailOpts = {
    from: 'qgerard.gerard@gmail.com',
    to: 'quentin@realtelematics.co.za',
    subject: 'Website contact - ' + req.body.subject,
    html: '<h1>' + req.body.subject + '</h1><p>' + req.body.message + '</p><br><p>Name: ' + req.body.username + '</p><p>Email address: ' + req.body.email + '</p><p>Contact number: ' + req.body.contact_number + '</p>' 
  };

  // SMTP transporter
  smtpTrans = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "qgerard.gerard@gmail.com",
        pass: "mwcciqcglhnukibf"
    }
  });

  // Sending the email
  smtpTrans.sendMail(mailOpts, function(error, message){
    if(error){
          res.render('includes/contact');
          console.log(error);
      }else{
          console.log(req.body.username + ' <' + req.body.email + '>');
          res.render('includes/contact');
          console.log("Message sent");
        }

  });
    smtpTrans.close();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
