'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn("Refferals", "adminComments", {
        type:Sequelize.STRING,
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Refferals', 'adminComments');
  }
};
