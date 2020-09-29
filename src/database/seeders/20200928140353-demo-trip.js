module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('trips', [{
    requester_id: 1,
    manager_id: 2,
    from: 1,
    to: 2,
    travel_type: 'one way trip',
    travel_date: new Date(),
    return_date: new Date(),
    travel_reason: 'Going to new Office',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    requester_id: 3,
    manager_id: 1,
    from: 2,
    to: 1,
    travel_type: 'one way trip',
    travel_date: new Date(),
    return_date: new Date(),
    travel_reason: 'Going to new Office',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    requester_id: 2,
    manager_id: 3,
    from: 5,
    to: 3,
    travel_type: 'one way trip',
    travel_date: new Date(),
    return_date: new Date(),
    travel_reason: 'Going to new Office',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('trips', null, {})
};
