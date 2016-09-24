'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Refferals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      refferalStatus_id: {
        type:Sequelize.INTEGER,
        foreignKey: true,
        references:{
          model: "refferalStatuses",
          key: "id"
        }
      },
      pic_id: {
        type:Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true,
        references:{
          model: "Pics",
          key: "id"
        }
      },
      latitude:{
        type: Sequelize.STRING
      },
      longitude:{
        type: Sequelize.STRING
      },
      adminComments: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Refferals');
  }
};