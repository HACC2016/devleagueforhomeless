'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn("Locations", "pic_id", {
        type:Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references:{
          model: "Pics",
          key: "id"
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Locations', 'pic_id');
  }
};
