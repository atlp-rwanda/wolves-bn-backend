const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    static associate(models) {
      // define association here
      trip.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'requester'
      });
    }
  }
  trip.init({
    userId: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    travel_date: DataTypes.DATE,
    return_date: DataTypes.DATE,
    travel_reason: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};
