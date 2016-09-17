'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn('Refferals', 'GPS');
  },

  down: function (queryInterface, Sequelize) {
       return queryInterface.addColumn("Refferals", "GPS", {
        type:Sequelize.STRING,
      });
  }
};
