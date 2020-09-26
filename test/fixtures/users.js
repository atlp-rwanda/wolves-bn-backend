import models from '../../src/database/models';
import { hashPassowrd, comparePassword, jwtToken } from '../../src/utils/jwtToken';

const { users } = models;

export const superAdmin = {
  firstName: 'super',
  lastName: 'admin',
  email: 'superadmin01@barefoot.com',
  password: hashPassowrd('1234567'),
  phone: '1234567898',
  role: 'super_admin',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const requester = {
  firstName: 'normal',
  lastName: 'requester',
  email: 'normaluser@barefoot.com',
  password: hashPassowrd('123456'),
  phone: '1234567898',
  role: 'manager',
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
  id: requester.id,
  firstName: requester.firstName,
  lastName: requester.lastName,
  email: requester.email,
  role: requester.role
});

export const createSuperAdmin = async () => {
  await users.create({ ...superAdmin, token: superAdminToken });
  await users.create({ ...requester, token: requesterToken });
};
