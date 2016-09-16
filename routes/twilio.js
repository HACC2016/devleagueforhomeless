var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('../models');
var Refferals = db.Refferals;

app.post('/message', function(req, res) {
  return Refferals
    .create(
      {
        refferalStatus: 1,
        phoneNumber: req.body.From,
        description: req.body.Body
      }
    )
    .then(function(refferal) {
      res.send("<Response><Message>Thank you for your referral</Message></Response>")
    });
});

module.exports = app;