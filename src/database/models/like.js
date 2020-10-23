const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    static associate(models) {
      like.belongsTo(models.users, {
        foreignKey: 'userId',
        as: 'User'
      });

      like.belongsTo(models.accomodation, {
        foreignKey: 'accomodationId',
        as: 'like'
      });
    }
  }
  like.init({
    userId: DataTypes.INTEGER,
    accomodationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};
