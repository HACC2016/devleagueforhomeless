var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db = require('../models');

var Refferals = db.Refferals;

// app.post("/message", function (request, response) {
//   //console.log(request.body);
//   response.send("<Response><Message>Thank you for your referral</Message></Response>")
// });

app.post('/message', function(req, res) {
    // Inserts Location data to  Locations table
    Refferals.create({refferalStatus:1,
                      phoneNumber: req.body.From,
                      city: req.body.FromCity,
                      state: req.body.FromState,
                      zip: req.body.FromZip,
                      description: req.body.Body})
   .then(function(refferal) {
     // Sends response that tells the pic got uploaded
    res.send("<Response><Message>Thank you for your referral</Message></Response>")
   })
});

module.exports = app;