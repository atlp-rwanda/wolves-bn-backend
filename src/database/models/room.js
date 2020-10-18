const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {
      // define association here
      room.belongsTo(models.accomodation, { foreignKey: 'accomodationId', as: 'accomodation', onDelete: 'cascade' });
    }
  }
  room.init({
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    accomodationId: DataTypes.INTEGER,
    images: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};