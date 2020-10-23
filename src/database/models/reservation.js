const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    static associate(models) {
      // define association here
    }
  }
  reservation.init({
    requester_id: DataTypes.INTEGER,
    trip_id: DataTypes.INTEGER,
    accommodation_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'reservation',
  });
  return reservation;
};