import models from '../../src/database/models';
import { hashPassowrd, comparePassword, jwtToken } from '../../src/utils/jwtToken';

const { users } = models;

export const superAdmin = {
  id: '10000',
  firstName: 'super',
  lastName: 'admin',
  email: 'superadmin01@barefoot.com',
  password: hashPassowrd('1234567'),
  phone: '1234567898',
  role: 'super_admin',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const superAdminToken = jwtToken.createToken({
  id: superAdmin.id,
  firstName: superAdmin.firstName,
  lastName: superAdmin.lastName,
  email: superAdmin.email,
});

export const createSuperAdmin = async () => {
  await users.create({ ...superAdmin, token: superAdminToken });
};
