const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class feedbacks extends Model {
    static associate(models) {
      feedbacks.belongsTo(models.users, {
        foreignKey: 'userId',
        as: 'User'
      });

      feedbacks.belongsTo(models.accomodation, {
        foreignKey: 'accomodationId',
        as: 'feedback'
      });
    }
  }
  feedbacks.init({
    userId: DataTypes.INTEGER,
    accomodationId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feedbacks',
  });
  return feedbacks;
};
