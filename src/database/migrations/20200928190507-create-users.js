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
      phone: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      resetLink: {
        type: Sequelize.STRING
      },
      fb_id: {
        type: Sequelize.STRING
      },
      gl_id: {
        type: Sequelize.STRING
      },
      profileimage: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      language: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      managerId: {
        type: Sequelize.INTEGER
      },
      manager: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM('super_admin', 'manager', 'travel_admin', 'requester')
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