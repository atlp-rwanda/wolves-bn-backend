const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      // define association here
    }
  }
  comment.init({
    tripId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};
