'use strict';
module.exports = function(sequelize, DataTypes) {
  var Locations = sequelize.define('Locations', {
    name: DataTypes.STRING,
    descrption: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.Locations.belongsTo(models.Gender, {
          foreignKey: 'gender_id',
          as: 'gender'
        });
        models.Locations.belongsTo(models.Pics, {
          foreignKey: 'pic_id',
          as: 'pic'
        });
      }
    }
  });
  return Locations;
};