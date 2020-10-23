module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('locations', [{
    city: 'Kigali',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    city: 'Kampala',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    city: 'Lagos',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    city: 'Nairobi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    city: 'Kigali',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    city: 'Nyamagabe',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    city: 'Cape Town',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('locations', null, {})
};