'use strict';
module.exports = function(sequelize, DataTypes) {
  var refferalStatus = sequelize.define('refferalStatus', {
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