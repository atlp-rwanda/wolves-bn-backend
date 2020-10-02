module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: 'Super',
    lastName: 'Admin',
    phone: '0788885588',
    role: 'super_admin',
    email: 'superadmin@barefoot.com',
    managerId: 4,
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'First',
    lastName: 'Manager',
    phone: '0788885544',
    role: 'manager',
    managerId: 3,
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
    managerId: 2,
    email: 'manager2@barefoot.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Third',
    lastName: 'Manager',
    phone: '0785885544',
    role: 'manager',
    managerId: 5,
    email: 'manager3@barefoot.com',
    password: '$2a$10$iyFH3/jgULgC0sMJ/VST1uR/.GKnx5IGtVIPsbhpsoz.pxe2yWnL6',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
