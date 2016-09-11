var express = require('express');
var app = express();
var db = require('./models');
var multiparty = require('multiparty');
var fs = require('fs');
var util = require('util');
var Locations = db.Locations;
var Pics = db.Pics;

const path = require('path');
const bodyParser = require('body-parser');


app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// middleware
app.use(function(req, res, next) {
  // set a header that will allow any origin to call me
  res.setHeader('Access-Control-Allow-Origin', '*');
  // turn off cache
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

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

var server = app.listen(app.get('port'), function(){
  var host = server.address().address;
  var port = server.address().port;
  db.sequelize.sync();
  console.log('listening on',host, port);
});
