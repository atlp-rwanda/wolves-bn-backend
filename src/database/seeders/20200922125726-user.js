module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: 'Super',
    lastName: 'Admin',
    phone: '0788885588',
    role: 'super_admin',
    email: 'superadmin@barefoot.com',
    manager_id: '1',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'First',
    lastName: 'Manager',
    phone: '0788885544',
    role: 'manager',
    manager_id: '2',
    email: 'wolvesmanager1@gmail.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Second',
    lastName: 'Manager',
    phone: '0785885544',
    role: 'manager',
    manager_id: '3',
    email: 'manager2@barefoot.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Fourth',
    lastName: 'Manager',
    phone: '0785885549',
    role: 'travel_admin',
    manager_id: 4,
    email: 'manager4@barefoot.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Irenee',
    lastName: 'Rukumbuzi',
    phone: '0785887749',
    role: 'requester',
    manager_id: '2',
    email: 'user@gmail.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'travel',
    lastName: 'admin',
    phone: '1234567898',
    role: 'travel_admin',
    manager_id: '1',
    email: 'traveladmin@barefoot.com',
    password: '$2a$10$45B3ulhrEikvm5GOVtc6QO6wTh8JPlx6ZX/Fg9O39TT5AFH2tdxKW',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: 'Normal',
    lastName: 'User',
    phone: '0788314143',
    role: 'requester',
    manager_id: '2',
    email: 'user1@gmail.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
