module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('accomodations', [{
      name: 'verda',
      description: 'verdana hotel',
      longitude: '2.4567984',
      latitude: '1.234455254',
      images: [
        'http://res.cloudinary.com/nraufu/image/upload/v1603050205/yzsxyoyleixmz0kx3ivf.jpg'
      ],
      facilities: ['Gym', 'Pool'],
      locationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'serena hotel',
      description: 'serena hotel',
      longitude: '2.45679888',
      latitude: '1.234455250',
      images: [
        'http://res.cloudinary.com/nraufu/image/upload/v1603050205/yzsxyoyleixmz0kx3ivf.jpg'
      ],
      facilities: ['Gym', 'Pool'],
      locationId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('accomodations', null, {});
  }
};
