var express = require('express');
var app = express();
var db = require('./models');
var multiparty = require('multiparty');
var fs = require('fs');
var util = require('util');
var Refferals = db.Refferals;
var Pics = db.Pics;
var bodyParser = require('body-parser');
var path = require('path');
var querystring= require('querystring');
// git remote add upstream parent https://github.com/HACC2016/devleagueforhomeless.git

const public = path.join(__dirname, 'public');

var twilioApp = require('./routes/twilio');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use('/twilio', twilioApp);
app.put(/\/homeless\/\d+/, function(req, res) {

});
app.get('/homeless', function(req, res) {
  console.log(Pics);
  Refferals.findAll({include: [{
      model: Pics,
      as: 'pic',
    }, {
      model: db.refferalStatus,
      as: 'refferalStatus',
    }]}).then(function(data) {
      res.json(data);
  });
});

app.post('/homeless', function(req, res, next) {
  // Create Form parse
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if(err)
      next(err);
    // Reads the file sent from the user
    fs.readFile(files.pic[0].path, function (err, data) {
      if(err)
        next(err);
      // Creates unique file name for picture
      var insertName = __dirname +
        '/uploads/' +
        Date.now() +
        files.pic[0].originalFilename;
      // Write file to disk
      fs.writeFile(insertName , data, function (err) {
        if(err)
          next(err);
        // Inserts Pic Name to  Picture table
        Pics.create({fileName: insertName})
        .then(function(pic) {
            // Inserts Location data to  Locations table
            Refferals.create({refferalStatus_id:1,
                              pic_id: pic.dataValues.id,
                              name: fields.name[0],
                              firstName: fields.firstName[0],
                              lastName: fields.lastName[0],
                              email: fields.email[0],
                              phoneNumber: fields.phoneNumber[0],
                              area: fields.area[0],
                              city: fields.city[0],
                              state: fields.state[0],
                              zip: fields.zip[0],
                              address: fields.address[0],
                              GPS: "(0,0)",
                              description: fields.description[0]})
            .then(function(refferal) {
              // Sends response that tells the pic got uploaded
              return res.json(refferal);
            });
        });
      });
    });
  });
});

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  db.sequelize.sync();
  console.log('listening on',host, port);
});