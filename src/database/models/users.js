const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // define association here
      users.hasMany(models.trip, {
        foreignKey: 'requester_id',
        as: 'trips'
      });
      users.belongsTo(models.users, {
        foreignKey: 'manager_id'
      });
      users.hasOne(models.preferences, {
        foreignKey: 'requester_id',
      });
      users.hasMany(models.notification, {
        foreignKey: 'notificationOwner'
      });
      users.hasMany(models.comment, {
        foreignKey: 'userId'
      });
    }
  }
  users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    resetLink: DataTypes.STRING,
    fb_id: DataTypes.STRING,
    gl_id: DataTypes.STRING,
    profileimage: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    language: DataTypes.STRING,
    currency: DataTypes.STRING,
    department: DataTypes.STRING,
    manager_id: DataTypes.INTEGER,
    role: DataTypes.ENUM('super_admin', 'manager', 'travel_admin', 'requester')
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};