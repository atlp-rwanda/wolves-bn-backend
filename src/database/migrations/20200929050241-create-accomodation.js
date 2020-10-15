module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accomodations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      description: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING,
        unique: true
      },
      latitude: {
        type: Sequelize.STRING,
        unique: true
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      facilities: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      hostId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      locationId: {
        type: Sequelize.INTEGER,
        foreignKey: true
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
    await queryInterface.dropTable('accomodations');
  }
};