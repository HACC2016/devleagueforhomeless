'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn("Refferals", "refferalStatus_id", {
        type:Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references:{
          model: "refferalStatuses",
          key: "id"
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Refferals', 'refferalStatus_id');
  }
};
