/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate() {
      // define association here
    }
  }
  user.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    phone: DataTypes.STRING,
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
    role: DataTypes.STRING,
    department: DataTypes.STRING,
    manager: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
