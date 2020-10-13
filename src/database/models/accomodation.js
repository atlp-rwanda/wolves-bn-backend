/* eslint-disable valid-jsdoc */
const {
  Model, Sequelize
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class accomodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      accomodation.hasMany(models.room, {
        onDelete: 'CASCADE',
        foreignKey: 'accomodationId',
        as: 'rooms'

      },
      accomodation.belongsTo(models.location, {
        foreignKey: 'locationId',
        as: 'city'
      }));
    }
  }
  accomodation.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    images: DataTypes.ARRAY(DataTypes.STRING),
    facilities: DataTypes.ARRAY(DataTypes.STRING),
    hostId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'accomodation',
  });
  return accomodation;
};