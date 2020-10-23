module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('preferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requester_id: {
        type: Sequelize.INTEGER
      },
      emailnotification: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      appnotification: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('preferences');
  }
};