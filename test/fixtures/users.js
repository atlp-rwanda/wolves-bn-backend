import models from '../../src/database/models';
import { hashPassowrd, jwtToken } from '../../src/utils/jwtToken';

const { users } = models;

export const superAdmin = {
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
export const requester = {
  firstName: 'normal',
  lastName: 'requester',
  email: 'normaluser@barefoot.com',
  password: hashPassowrd('123456'),
  manager_id: '2',
  phone: '1234567898',
  role: 'manager',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const dummyUser = {
  firstName: 'dummy',
  lastName: 'user',
  email: 'dummyuser@barefoot.com',
  password: hashPassowrd('123456'),
  manager_id: '2',
  phone: '1234567898',
  role: 'requester',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const superAdminToken = jwtToken.createToken({
  id: superAdmin.id,
  firstName: superAdmin.firstName,
  lastName: superAdmin.lastName,
  email: superAdmin.email,
  role: superAdmin.role
});
export const requesterToken = jwtToken.createToken({
  id: dummyUser.id,
  firstName: dummyUser.firstName,
  lastName: dummyUser.lastName,
  email: dummyUser.email,
  role: dummyUser.role
});

export const dummyToken = jwtToken.createToken({
  id: requester.id,
  firstName: requester.firstName,
  lastName: requester.lastName,
  email: requester.email,
  role: requester.role
});

export const createSuperAdmin = async () => {
  await users.create({ ...superAdmin, token: superAdminToken });
};
export const createRequester = async () => {
  await users.destroy({ where: {} });
  await users.create({ ...requester, token: requesterToken });
};

export const createDummyUser = async () => {
  await users.create({ ...dummyUser, token: dummyToken });
};
