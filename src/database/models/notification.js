const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    static associate(models) {
      // define association here
      notification.belongsTo(models.users, {
        foreignKey: 'notificationOwner',
        as: 'notification'
      });
    }
  }
  notification.init({
    notificationOwner: DataTypes.INTEGER,
    message: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN,
    tripId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};