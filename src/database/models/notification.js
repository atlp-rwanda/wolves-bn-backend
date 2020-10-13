const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // define association here
      Notification.belongsTo(models.users, {
        foreignKey: 'requester_id',
        as: 'Notification',
        targetKey: 'id'
      });
    }
  }
  Notification.init({
    requester_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN,
    tripId: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};