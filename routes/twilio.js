var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.post("/message", function (request, response) {
  response.send("<Response><Message>Thank you for your referral</Message></Response>")
});

module.exports = app;