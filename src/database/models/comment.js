import emitter from '../../helpers/events/eventEmitter';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      // define association here
      comment.afterCreate((data) => {
        emitter.emit('comment-on-trip', data);
      });
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
