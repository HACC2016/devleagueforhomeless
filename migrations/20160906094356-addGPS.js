'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn("Refferals", "GPS", {
        type:Sequelize.STRING,
        allowNull: true,
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Refferals', 'GPS');
  }
};
