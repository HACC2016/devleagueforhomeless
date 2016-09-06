'use strict';
module.exports = function(sequelize, DataTypes) {
  var Locations = sequelize.define('Refferals', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.Locations.belongsTo(models.Pics, {
          foreignKey: 'pic_id',
          as: 'pic'
        });
        models.Locations.belongsTo(models.refferalStatus, {
          foreignKey: 'refferalStatus_id',
          as: 'refferalStatus'
        });
      }
    }
  });
  return Locations;
};