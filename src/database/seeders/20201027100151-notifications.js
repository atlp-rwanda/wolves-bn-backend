module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('notifications', [{
      notificationOwner: 40,
      message: 'visiting',
      isRead: 'false',
      tripId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      notificationOwner: 40,
      message: 'tourism',
      isRead: 'false',
      tripId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      notificationOwner: 40,
      message: 'enjoy the countrySide',
      isRead: 'false',
      tripId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      notificationOwner: 2,
      message: 'visit places',
      isRead: 'false',
      tripId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      notificationOwner: 2,
      message: 'visit rural places',
      isRead: 'false',
      tripId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('notifications', null, {});
  }
};
