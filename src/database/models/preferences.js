const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class preferences extends Model {
    static associate(models) {
      // define association here
      preferences.belongsTo(models.users, {
        foreignKey: 'requester_id',
        as: 'preference'
      });
    }
  }
  preferences.init({
    requester_id: DataTypes.INTEGER,
    emailnotification: DataTypes.BOOLEAN,
    appnotification: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'preferences',
  });
  return preferences;
};