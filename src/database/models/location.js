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
      });
      location.hasMany(models.trip, {
        foreignKey: 'to',
        as: 'destination',
      });
      location.hasMany(models.accomodation, {
        foreignKey: 'locationId'
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
