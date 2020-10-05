module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: 'Super',
    lastName: 'Admin',
    phone: '0788885588',
    role: 'super_admin',
    email: 'superadmin@barefoot.com',
<<<<<<< HEAD
<<<<<<< HEAD
    manager_id: null,
=======
    manager_d: '1',
>>>>>>> f73704d... (ft-comment-delete-travel-174772229):post comments and delete
=======
    manager_id: '1',
>>>>>>> a277d99... checking some conditions before commenting and listing on comments
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'First',
    lastName: 'Manager',
    phone: '0788885544',
    role: 'manager',
<<<<<<< HEAD
<<<<<<< HEAD
    manager_id: null,
=======
    manager_d: '2',
>>>>>>> f73704d... (ft-comment-delete-travel-174772229):post comments and delete
=======
    manager_id: '2',
>>>>>>> a277d99... checking some conditions before commenting and listing on comments
    email: 'manager1@barefoot.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Second',
    lastName: 'Manager',
    phone: '0785885544',
    role: 'manager',
<<<<<<< HEAD
<<<<<<< HEAD
    manager_id: null,
=======
    manager_d: '3',
>>>>>>> f73704d... (ft-comment-delete-travel-174772229):post comments and delete
=======
    manager_id: '3',
>>>>>>> a277d99... checking some conditions before commenting and listing on comments
    email: 'manager2@barefoot.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Fourth',
    lastName: 'Manager',
    phone: '0785885549',
    role: 'manager',
<<<<<<< HEAD
<<<<<<< HEAD
    manager_id: null,
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
    manager_id: 2,
    email: 'rukumbuzi@barefoot.com',
=======
    manager_d: '4',
=======
    manager_id: '4',
>>>>>>> a277d99... checking some conditions before commenting and listing on comments
    email: 'manager3@barefoot.com',
>>>>>>> f73704d... (ft-comment-delete-travel-174772229):post comments and delete
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Normal',
    lastName: 'User',
    phone: '0788314143',
    role: 'requester',
    manager_id: '2',
    email: 'user@barefoot.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
