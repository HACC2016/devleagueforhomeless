'use strict';

module.exports = {
up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('refferalStatuses', [{
      name: 'Done',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name: 'In Progress',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name: 'Danger',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name: 'Queue',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('refferalStatuses', []);
  }
};
