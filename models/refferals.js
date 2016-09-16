'use strict';
module.exports = function(sequelize, DataTypes) {
  var Refferals = sequelize.define('Refferals', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    area: DataTypes.STRING,
    address:DataTypes.STRING,
    zip: DataTypes.INTEGER,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    GPS: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Refferals.belongsTo(models.Pics, {
          foreignKey: 'pic_id',
          as: 'pic'
        });
        models.Refferals.belongsTo(models.refferalStatuses, {
          foreignKey: 'refferalStatus_id',
          as: 'refferalStatus'
        });
      }
    }
  });
  return Refferals;
};