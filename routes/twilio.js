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
  if (streetRegex){
    var streetStr = streetRegex[0];
    var streetDatabase = streetStr.slice(3);
  }
  streetRegex = " ";

  var cityRE = /^C:.*$/gm;
  var cityRegex = reqBodyBody.match(cityRE);
  if (cityRegex){
    var cityStr = cityRegex[0];
    var cityDatabase = cityStr.slice(3);
  }
  cityRegex = " ";

  var stateRE = /^State:.*$/gm;
  var stateRegex = reqBodyBody.match(stateRE);
  if (stateRegex){
    var stateStr = stateRegex[0];
    var stateDatabase = stateStr.slice(7);
  }
  stateRegex = " ";

  var zipRE = /^Z:.*$/gm;
  var zipRegex = reqBodyBody.match(zipRE);
  if (zipRegex){
    var zipStr = zipRegex[0];
    var zipDatabase = zipStr.slice(3);
  }
  zipRegex = " ";

  var firstNameRE = /^FN:.*$/gm;
  var firstNameRegex = reqBodyBody.match(firstNameRE);
  if (firstNameRegex){
    var firstNameStr = firstNameRegex[0];
    var firstNameDatabase = firstNameStr.slice(3);
  }
  firstNameRegex = " ";

  var lastNameRE = /^LN:.*$/gm;
  var lastNameRegex = reqBodyBody.match(lastNameRE);
  if (lastNameRegex){
    var lastNameStr = lastNameRegex[0];
    var lastNameDatabase = lastNameStr.slice(3);
  }
  lastNameRegex = " ";

  var descriptionRE = /^D:.*$/gm;
  console.log(reqBodyBody.match(descriptionRE));
  var descriptionRegex = reqBodyBody.match(descriptionRE);
  if (descriptionRegex){
    var descriptionStr = descriptionRegex[0];
    var descriptionDatabase = descriptionStr.slice(3);
  }
  descriptionRegex = " ";

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
       firstName: firstNameDatabase,
       lastName: lastNameDatabase,
       description: descriptionDatabase,
       address: streetDatabase,
       zip: zipDatabase,
       state: stateDatabase,
       city: cityDatabase
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