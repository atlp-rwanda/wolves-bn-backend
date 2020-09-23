import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();
export const jwtToken = {
  createToken({
    id, email, firstName, lastName, role
  }) {
    return jwt.sign({
      id, email, firstName, lastName, role
    },
    process.env.SECRET_OR_KEY, { expiresIn: '24h' });
  }
};

export const hashPassowrd = (password) => bcrypt.hashSync(password, 10);
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
