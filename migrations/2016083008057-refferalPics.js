'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn("Refferals", "pic_id", {
        type:Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true,
        references:{
          model: "Pics",
          key: "id"
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Refferals', 'pic_id');
  }
};
