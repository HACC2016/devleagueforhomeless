'use strict';
const faker = require('faker');

const BASE_LAT = 21.309144;
const BASE_LNG = -157.808631;

function geoAdjustment (coor) {
  return coor + ((Math.random() * 0.1) - 0.05);
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    var people = [];
    for(var i = 0; i < 3; i++){
      people.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        description: faker.hacker.abbreviation(),
        area: 'kakaako',
        state: 'HI',
        zip: 96819,
        city: 'honolulu',
        address: 'honolulu, hi',
        adminComments: 'none',
        createdAt: new Date(),
        updatedAt: new Date(),
        latitude: JSON.stringify(geoAdjustment(BASE_LAT)),
        longitude: JSON.stringify(geoAdjustment(BASE_LNG)),
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
