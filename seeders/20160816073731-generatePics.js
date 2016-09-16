'use strict';

module.exports = {
up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pics', [{
      fileName: 'http://res.cloudinary.com/dvhhss7ks/image/upload/v1474009827/w7nrrir2fl1zc5bd8gaj.jpg',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      fileName: 'http://res.cloudinary.com/dvhhss7ks/image/upload/v1474007997/auaeewt8stqeju5umamc.jpgs',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      fileName: 'http://res.cloudinary.com/dvhhss7ks/image/upload/v1474005073/xzbyx6ywjtx1bwzpskrr.png',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      fileName: 'http://res.cloudinary.com/dvhhss7ks/image/upload/v1473580597/sample.jpg',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Pics', []);
  }
};
