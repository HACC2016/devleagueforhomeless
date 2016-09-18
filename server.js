var express = require('express');
var path = require('path');
var db = require('./models');
var multiparty = require('multiparty');
var fs = require('fs');
var util = require('util');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var methodOverride = require('method-override');
var cloudinary = require('cloudinary');
var cloudConfig = require('./config/cloudConfig.json');

var app = express();
var Refferals = db.Refferals;
var Pics = db.Pics;

var twilioApp = require('./routes/twilio');

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/twilio', twilioApp);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

cloudinary.config({
  cloud_name: cloudConfig.name,
  api_key: cloudConfig.key,
  api_secret: cloudConfig.secret
});

app.get('/homeless', function(req, res) {
  Refferals.findAll({order:'id ASC',include: [{
      model: Pics,
      as: 'pic',
    }, {
      model: db.refferalStatuses,
      as: 'refferalStatus',
    }]}).then(function(data) {
      res.json(data);
  });
});

/* Admin-view */
app.get('/dashboard', function(req, res, next) {
  Refferals.findAll({order:'id ASC', include: [{
      model: Pics,
      as: 'pic',
    }, {
      model: db.refferalStatuses,
      as: 'refferalStatus',
    }]}).then(function(refferal) {
      for(var i = 0; i < refferal.length; i++) {
        refferal[i].formatDate = dateFormat(refferal[i].createdAt, "mmmm dS, yyyy, h:MM:ss TT");
      }
      /* add a blank value so that jade table doesn't skip any values. */
      // refferal.push({});
      refferal.unshift({});
      res.render('dashboard', {json: refferal});
  });
});

app.get(/\/description\/\d/, function(req, res) {
 var split = req.url.split('/');
 var numId = split[2];
 Refferals.findOne({
   where: {
     id: numId
   },
   include: [{
     model: Pics,
     as: 'pic',
   }, {
     model: db.refferalStatuses,
     as: 'refferalStatus',
   }]}).then(function(data) {
      res.render('fullDescription', {json: data});
  });
});

app.post('/homeless', function(req, res, next) {
  // Create Form parse
  console.log("=======", req.body);
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if(err)
      throw err;
    if(files.pic[0].size){
      cloudinary.uploader.upload(files.pic[0].path, function(result) {
        return Pics.create({fileName: result.url})
        .then(function(cloudPic) {
          Refferals.create({refferalStatus_id:3,
            pic_id: cloudPic.id,
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
            latitude: fields.latitude[0],
            longitude: fields.longitude[0],
            description: fields.description[0]})
          .then(function(refferal) {
            return res.render('success');
          });
        });
      });
    }
    else{
       Refferals.create({refferalStatus_id:3,
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
          latitude: fields.latitude[0],
          longitude: fields.longitude[0],
          description: fields.description[0]})
          .then(function(refferal) {
            // Sends response that tells the pic got uploaded
            return res.render('success');
          });
    }
  });
});

app.post("/api/homeless", function (req, res) {
  console.log(req.body);
  Refferals.create({
    longitude: req.body.longitude,
    latitude: req.body.latitude
  });
});

app.put(/\/homeless\/\d+/, function(req, res) {
 var split = req.url.split('/');
 var numId = split[2];
 Refferals.update(req.body,{where:{id:numId}})
   .then((data)=> {
     res.render('success');
   });
});

app.get(/\/homeless\/\d+\/photo/, function(req, res) {
 var split = req.url.split('/');
 var numId = split[2];
 Refferals.findOne({
   where: {
     id: numId
   },
   include: [{
     model: Pics,
     as: 'pic',
   }, {
     model: db.refferalStatuses,
     as: 'refferalStatus',
   }]}).then(function(data) {
      res.redirect(data.dataValues.pic.fileName);
  });
});

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  db.sequelize.sync();
  console.log('listening on',host, port);
});