module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('preferences', [{
      requester_id: 2,
      emailnotification: 'true',
      appnotification: 'true',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('preferences', null, {});
  }
};
