/* eslint-disable valid-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.trip, {
        foreignKey: 'userId',
        as: 'trips',
      });
    }
  }
  users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    resetLink: DataTypes.STRING,
    fb_id: DataTypes.STRING,
    gl_id: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    role: DataTypes.ENUM('super_admin', 'travel_admin', 'manager', 'requester')
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};