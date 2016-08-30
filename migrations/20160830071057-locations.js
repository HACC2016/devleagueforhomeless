'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn("Locations", "gender_id", {
        type:Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references:{
          model: "Genders",
          key: "id"
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Locations', 'gender_id');
  }
};
