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
        foreignKey: 'request_id', as: 'trip', targetKey: 'id'
      });
    }
  }
  request.init({
    requester_id: DataTypes.INTEGER,
    manager_id: DataTypes.INTEGER,
    requesterFname: DataTypes.STRING,
    requesterLname: DataTypes.STRING,
    travel_type: DataTypes.STRING,
    request_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};