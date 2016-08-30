'use strict';

module.exports = {
up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Genders', [{
      name: 'Male',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name: 'Female',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name: 'Group',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name: 'Other',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Genders', []);
  }
};
