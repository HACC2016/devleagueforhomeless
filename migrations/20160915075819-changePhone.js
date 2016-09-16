'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Refferals', 'phoneNumber', {
      type: Sequelize.STRING
    });
  },
  down: function(queryInterface, Sequelize) {
     return queryInterface.changeColumn('Refferals', 'phoneNumber', {
      type: Sequelize.INTEGER
    });
  }
};