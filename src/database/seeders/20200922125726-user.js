module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: 'Super',
    lastName: 'Admin',
    phone: '0788885588',
    role: 'super_admin',
    email: 'superadmin@barefoot.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Irene',
    lastName: 'Rukumbuzi',
    phone: '0788885544',
    role: 'requester',
    email: 'rukkirene21@gmail.com',
    password: 'Passwor',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Anisie',
    lastName: 'Uwimana',
    phone: '0785885544',
    role: 'requester',
    email: 'anisie@barefoot.com',
    password: 'Password',
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
