const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    static associate(models) {
      // define association here
      request.belongsTo(models.users, {
        foreignKey: 'requester_id', targetKey: 'id',
      });
      request.hasMany(models.trip, {
        foreignKey: 'requester_id', as: 'trip', targetKey: 'id'
      });
    }
  }
  request.init({
    travel_type: DataTypes.STRING,
    requester_id: DataTypes.INTEGER,
    request_status: DataTypes.STRING,
    manager_id: DataTypes.INTEGER,
    requesterFname: DataTypes.STRING,
    requesterLname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};