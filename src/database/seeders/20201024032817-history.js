module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('histories', [
      {
        firstName: 'Innocent',
        lastName: 'Ingabire',
        phone: '7687677',
        email: 'innocent@gmail.com',
        Do_You_want_remember_info: 'yes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Irene',
        lastName: 'Someone',
        phone: '76876477',
        email: 'irene@gmail.com',
        Do_You_want_remember_info: 'yes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Anisie',
        lastName: 'Someone',
        phone: '7333334',
        email: 'anisie@gmail.com',
        Do_You_want_remember_info: 'yes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Rauf',
        lastName: 'Niyonzi',
        phone: '453',
        email: 'rauf@gmail.com',
        Do_You_want_remember_info: 'yes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Cherubin',
        lastName: 'Someone',
        phone: '768',
        email: 'cherubin@gmail.com',
        Do_You_want_remember_info: 'yes',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('histories', null, {});
  }
};
