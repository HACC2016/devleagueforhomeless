'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn("Reporters", "reporter_id", {
        type:Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references:{
          model: "Refferals",
          key: "id"
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Reporters', 'reporter_id');
  }
};
