module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requester_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      manager_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      request_status: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      from: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      to: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      travel_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      travel_date: {
        type: Sequelize.DATE
      },
      return_date: {
        type: Sequelize.DATE
      },
      travel_reason: {
        type: Sequelize.STRING
      },
      accommodation: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('trips');
  }
};