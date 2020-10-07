import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/named
import { redisclient } from '../controllers/user';

module.exports = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.status(401).json({ message: 'user not authenticated' });
  redisclient.get(token, (error, value) => {
    if (value === null) { // null mean that the token is not in redis
      try {
        const decoded = jwt.verify(token, process.env.SECRET_OR_KEY);
        req.user = decoded.user;
        next();
      } catch (e) {
        // console.error(e);
        res.status(500).send({ message: 'Invalid Token' });
      }
    } else {
      res.status(401).json({ message: 'User already logout' });
    }
  });
};
