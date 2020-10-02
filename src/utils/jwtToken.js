/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();
export const jwtToken = {
  createToken({
    id, email, firstName, lastName, role, managerId
  }) {
    return jwt.sign({
      id, email, firstName, lastName, role, managerId
    },
    process.env.SECRET_OR_KEY, { expiresIn: '24h' });
  },
};
export function verifyingToken(token) {
  const verifiedToken = jwt.verify(token, process.env.SECRET_OR_KEY);
  return verifiedToken;
}

export const hashPassowrd = (password) => bcrypt.hashSync(password, 10);
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
