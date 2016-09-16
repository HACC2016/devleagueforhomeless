'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn("Refferals", "longitude", {
        type:Sequelize.STRING,
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Refferals', 'longitude');
  }
};
