'use strict';
module.exports = function(sequelize, DataTypes) {
  var refferalStatus = sequelize.define('refferalStatuses', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return refferalStatus;
};