/* eslint-disable no-dupe-keys */
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
        type: Sequelize.STRING,
        allowNull: true
      },
      profileimage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      language: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true
      },

      department: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
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
      managerId: {
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
    await queryInterface.addColumn(
      'users',
      'profileimage', {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      'users',
      'address', {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      'users',
      'gender', {
        type: Sequelize.STRING,
        allowNull: true,
      }

    );
    await queryInterface.addColumn(
      'users',
      'birthdate', {
        type: Sequelize.DATE,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      'users',
      'language', {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      'users',
      'currency', {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      'users',
      'department', {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      'users',
      'manager', {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      'users',
      'role', {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
