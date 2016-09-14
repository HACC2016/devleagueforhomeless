'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('refferals', [{
      name: 'Kawika',
      description: 'a new kakaako camp brah',
      createdAt: new Date(),
      updatedAt: new Date(),
      GPS: {
        lat: 21.3069,
        lng: 157.8583
      }
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('refferals');
  }
};
