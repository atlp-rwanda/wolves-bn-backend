const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    static associate(models) {
      // define association here
      trip.belongsTo(models.users, {
        foreignKey: 'requester_id',
        as: 'requester',
        targetKey: 'id'
      });
      trip.belongsTo(models.location, {
        foreignKey: 'from',
        as: 'departure'
      });
      trip.belongsTo(models.location, {
        foreignKey: 'to',
        as: 'destination'
      });
    }
  }
  trip.init({
    requester_id: DataTypes.INTEGER,
    manager_id: DataTypes.INTEGER,
    request_status: DataTypes.STRING,
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    travel_type: DataTypes.STRING,
    travel_date: DataTypes.DATE,
    return_date: DataTypes.DATE,
    travel_reason: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};
