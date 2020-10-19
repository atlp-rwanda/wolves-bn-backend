module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('accomodations', [{
      name: 'Marriot',
      description: 'Marriot Hotel',
      longitude: '2.456789',
      latitude: '1.234455667',
      images: [
        'http://res.cloudinary.com/nraufu/image/upload/v1603050205/yzsxyoyleixmz0kx3ivf.jpg'
      ],
      facilities: ['Gym', 'Pool'],
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('accomodations', null, {});
  }
};
