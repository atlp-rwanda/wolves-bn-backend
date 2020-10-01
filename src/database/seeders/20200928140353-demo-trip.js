module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('trips', [{
    from: 1,
    to: 2,
    requester_id: 1,
    manager_id: 2,
    travel_type: 'one way trip',
    request_status: 'pending',
    travel_date: new Date(),
    return_date: new Date(),
    travel_reason: 'Going to new Office',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    from: 3,
    to: 4,
    requester_id: 3,
    manager_id: 1,
    request_status: 'pending',
    travel_type: 'one way trip',
    travel_date: new Date(),
    return_date: new Date(),
    travel_reason: 'New Mission',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    from: 5,
    to: 1,
    requester_id: 2,
    manager_id: 3,
    request_status: 'pending',
    travel_type: 'one way trip',
    travel_date: new Date(),
    return_date: new Date(),
    travel_reason: 'Going to take trainings',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    requester_id: 6,
    manager_id: 4,
    from: 2,
    to: 1,
    travel_type: 'one way trip',
    travel_date: new Date(),
    return_date: new Date(),
    travel_reason: 'Going to new Office',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    requester_id: 0,
    manager_id: 0,
    from: 2,
    to: 1,
    travel_type: 'one way trip',
    travel_date: new Date(),
    return_date: new Date(),
    travel_reason: 'Going to new Office by requester',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('trips', null, {})
};
