import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();
export const jwtToken = {
  createToken({ id, email }) {
    return jwt.sign({ id, email },
      process.env.SECRET_OR_KEY, { expiresIn: '24h' });
  }

};

export const hashPassowrd = (password) => bcrypt.hashSync(password, 10);
