var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('../models');
var Refferals = db.Refferals;
var Pics = db.Pics;

app.post('/message', function(req, res) {
  console.log("Original", req.body.Body);
  var reqBodyBody = req.body.Body;

  var streetRE = /^S:.*$/gm;
  var streetRegex = reqBodyBody.match(streetRE);
  console.log("Street Regex", streetRegex[0]);

  var streetStr = streetRegex[0];
  console.log("Street string", streetStr);

  var streetDatabase = streetStr.slice(2);
  console.log("Street ready for database", streetDatabase);


  var nameRE = /^N:.*$/gm;
  console.log(reqBodyBody.match(nameRE));

  var descriptionRE = /^D:.*$/gm;
  console.log(reqBodyBody.match(descriptionRE));

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
       description: req.body.Body,
       address: streetDatabase
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
      return res.send("<Response><Message> \nThank you for your referral. \nFor more info, please contact us at (808) 447-2800.</Message></Response>")
    })
    .catch(function (err) {
      throw err;
    });
});

module.exports = app;