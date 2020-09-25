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
    managerId: DataTypes.INTEGER,
    manager: DataTypes.STRING,
    role: DataTypes.ENUM('super_admin', 'manager', 'travel_admin', 'requester')
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};