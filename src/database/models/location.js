const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    static associate(models) {
      // define association here
      location.hasMany(models.trip, {
        foreignKey: 'from',
        as: 'departure',
        targetKey: 'id'
      });
      location.hasMany(models.trip, {
        foreignKey: 'to',
        as: 'destination',
        targetKey: 'id'
      });
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