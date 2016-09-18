'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pics = sequelize.define('Pics', {
    fileName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  return Pics;
};