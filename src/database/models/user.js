/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate() {
      // define association here
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
<<<<<<< HEAD
    isAdmin: DataTypes.BOOLEAN,
    confirmed: DataTypes.BOOLEAN
=======
    phone: DataTypes.INTEGER,
    role: DataTypes.ENUM('super_admin', 'travel_admin', 'manager', 'requester')
>>>>>>> 7e14746... Added Role Controller and Seeders
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
