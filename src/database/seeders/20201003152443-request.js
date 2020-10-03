module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('requests', [{
    manager_id: 2,
    requester_id: 1,
    travel_type: 'one way trip',
    request_status: 'pending',
    requesterFname: 'Denis',
    requesterLname: 'Niwemugisha',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    manager_id: 3,
    requester_id: 2,
    travel_type: 'one way trip',
    request_status: 'pending',
    requesterFname: 'Innocent',
    requesterLname: 'Ingabire',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    manager_id: 2,
    requester_id: 3,
    travel_type: 'one way trip',
    request_status: 'pending',
    requesterFname: 'Irenee',
    requesterLname: 'Rukumbuzi',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('requests', null, {})
};