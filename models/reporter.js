'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reporter = sequelize.define('Reporter', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Report.belongsTo(models.Refferals, {
          foreignKey: 'refferal_id',
          as: 'refferal'
        });
      }
    }
  });
  return Reporter;
};