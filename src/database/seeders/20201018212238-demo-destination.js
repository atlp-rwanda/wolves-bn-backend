module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('destinations', [{
    to: 1,
    name: 'Kacyiru',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    to: 2,
    name: 'Remera',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    to: 2,
    name: 'Remera',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    to: 3,
    name: 'Kabuga',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    to: 3,
    name: 'Kabuga',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    to: 3,
    name: 'Kabuga',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('destinations', null, {})
};
