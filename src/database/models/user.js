/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');

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
    isAdmin: DataTypes.BOOLEAN,
    confirmed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
