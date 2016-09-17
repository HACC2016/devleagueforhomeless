'use strict';
var faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var people = [];
    for(var i = 0; i < 3; i++){
      var lat = Math.random() * (22 - 20) + 20;
      var long = Math.random() * (-158 + 156) + -156;

      people.push({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        description: faker.hacker.abbreviation(),
        area: 'kakaako',
        state: 'HI',
        zip: 96819,
        city: 'honolulu',
        address: 'honolulu, hi',
        createdAt: new Date(),
        updatedAt: new Date(),
        latitude: JSON.stringify(lat),
        longitude: JSON.stringify(long),
        refferalStatus_id: 2,
        pic_id: 1
      });
    }
    return queryInterface.bulkInsert('Refferals', people, {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Refferals', []);
  }
};
