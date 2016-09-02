var express = require('express');
var app = express();
var db = require('./models');
var multiparty = require('multiparty');
var fs = require('fs');
var util = require('util');
var Locations = db.Locations;
var Pics = db.Pics;
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

app.get('/homeless', function(req, res) {
  Locations.findAll({include: [{
      model: db.Gender,
      as: 'gender',
      required: true
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
        Pics.create({name: insertName}).
          then(function(pic) {
            // Inserts Location data to  Locations table
            Locations.create({name: fields.name[0],
                              gender_id:fields.gender[0],
                              pic_id: pic.dataValues.id,
                              description: fields.description[0]}).
            then(function(argument) {
              // Sends response that tells the pic got uploaded
              res.writeHead(200, {'content-type': 'text/plain'});
              res.write('received upload:\n\n');
              res.end(util.inspect({fields: fields, files: files}));
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