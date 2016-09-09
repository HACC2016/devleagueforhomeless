'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn("Refferals", "reporter_id", {
        type:Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true,
        references:{
          model: "Reporters",
          key: "id"
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Refferals', 'reporter_id');
  }
};
