import models from '../../src/database/models';
import { hashPassowrd, jwtToken } from '../../src/utils/jwtToken';

const { users } = models;
export const travelAdmin = {
  id: 100,
  firstName: 'travel',
  lastName: 'admin',
  email: 'traveladmin@barefoot.com',
  password: hashPassowrd('1234567'),
  phone: '1234567898',
  managerId: '1',
  role: 'travel_admin',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const superAdmin = {
  id: 30,
  firstName: 'super',
  lastName: 'admin',
  email: 'superadmin01@barefoot.com',
  password: hashPassowrd('1234567'),
  phone: '1234567898',
  manager_id: '1',
  role: 'super_admin',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const manager = {
  id: 40,
  firstName: 'normal',
  lastName: 'manager',
  email: 'normalmanager@barefoot.com',
  password: hashPassowrd('123456'),
  manager_id: null,
  phone: '1234567898',
  role: 'manager',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const dummyUser = {
  id: 50,
  firstName: 'dummy',
  lastName: 'user',
  email: 'dummyuser@barefoot.com',
  password: hashPassowrd('123456'),
  manager_id: 2,
  phone: '1234567898',
  role: 'requester',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const travelAdminToken = jwtToken.createToken({
  id: travelAdmin.id,
  firstName: travelAdmin.firstName,
  lastName: travelAdmin.lastName,
  email: travelAdmin.email,
  role: travelAdmin.role
});
export const superAdminToken = jwtToken.createToken({
  id: superAdmin.id,
  firstName: superAdmin.firstName,
  lastName: superAdmin.lastName,
  email: superAdmin.email,
  role: superAdmin.role
});
export const managerToken = jwtToken.createToken({
  id: manager.id,
  firstName: manager.firstName,
  lastName: manager.lastName,
  email: manager.email,
  role: manager.role
});

export const dummyToken = jwtToken.createToken({
  id: dummyUser.id,
  firstName: dummyUser.firstName,
  lastName: dummyUser.lastName,
  email: dummyUser.email,
  role: dummyUser.role
});
export const createTravelAdmin = async () => {
  await users.create({ ...travelAdmin, token: travelAdminToken });
};
export const createSuperAdmin = async () => {
  await users.create({ ...superAdmin, token: superAdminToken });
};
export const createManager = async () => {
  await users.destroy({ where: {} });
  await users.create({ ...manager, token: managerToken });
};

export const createDummyUser = async () => {
  await users.create({ ...dummyUser, token: dummyToken });
};
