module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('trips', [{
    userId: 1,
    from: 'Kigali',
    to: 'Kampala',
    travel_date: new Date(),
    return_date: new Date(),
    travel_reason: 'Going to new Office',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('trips', null, {})
};
