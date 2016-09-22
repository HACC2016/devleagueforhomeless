var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('../models');
var Refferals = db.Refferals;
var Pics = db.Pics;

app.post('/message', function(req, res) {
  var referral;
  var imageURL;

  if (req.body.MediaUrl0) {
    imageURL = req.body.MediaUrl0;
  }

  return Refferals
    .create(
      {
       refferalStatus_id: 1,
       phoneNumber: req.body.From,
       description: req.body.Body
      }
    )
    .then(function (newReferral) {
      referral = newReferral;
      if (imageURL) {
        return Pics.create({ fileName: imageURL })
      }
    })
    .then (function (newPic) {
      if (newPic) {
        return referral.update({ pic_id: newPic.id });
      }
    })
    .then(function (referral) {
      return res.send("<Response><Message>Thank you for your referral</Message></Response>")
    })
    .catch(function (err) {
      throw err;
    });
});

module.exports = app;