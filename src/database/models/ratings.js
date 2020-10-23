const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ratings extends Model {
    static associate(models) {
      ratings.belongsTo(models.users, {
        foreignKey: 'userId',
        as: 'User'
      });
      ratings.belongsTo(models.accomodation, {
        foreignKey: 'accomodationId',
        as: 'rates'
      });
    }
  }

  ratings.init({
    userId: DataTypes.INTEGER,
    accomodationId: DataTypes.INTEGER,
    rating: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ratings',
  });
  return ratings;
};
