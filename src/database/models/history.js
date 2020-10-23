const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    static associate(models) {
    }
  }
  history.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    Do_You_want_remember_info: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};