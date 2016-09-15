'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Refferals', [{
      name: 'Kawika',
      area: 'kakaako',
      address: 'honolulu, hi',
      zip: 96819,
      state: 'HI',
      city: 'honolulu',
      description: 'a new kakaako camp brah',
      createdAt: new Date(),
      updatedAt: new Date(),
      // reporter_id: 1,
      // pic_id: 1,
      GPS: 'lat: 21.3069, lng: -157.8583',
      refferalStatus_id: 1
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Refferals', []);
  }
};
