const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    static associate(models) {
      // define association here
    }
  }
  location.init({
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'location',
  });
  return location;
};