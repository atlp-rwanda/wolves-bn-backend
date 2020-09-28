module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      fb_id: {
        type: Sequelize.STRING
      },
      gl_id: {
        type: Sequelize.STRING
      },
      confirmed: {
        type: Sequelize.BOOLEAN
      },
      resetLink: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.ENUM('super_admin', 'travel_admin', 'manager', 'requester'),
        defaultValue: 'requester'
      },
      manager_d: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '2'
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
    await queryInterface.dropTable('users');
  }
};
