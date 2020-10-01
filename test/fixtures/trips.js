import models from '../../src/database/models';

const { trips } = models;

export const UserTrips = {
  requester_id: 1,
  request_id: 1,
  manager_id: 2,
  from: 1,
  to: 2,
  travel_type: 'one way trip',
  travel_date: new Date(),
  return_date: new Date(),
  travel_reason: 'Going to new Office',
  createdAt: new Date(),
  updatedAt: new Date()
};

export const createTrips = async () => {
  await trips.destroy({ where: {} });
  await trips.create({ ...UserTrips });
};
