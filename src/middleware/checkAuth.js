import { verifyingToken } from '../utils/jwtToken';

const authMiddleware = {
  verifyUser: (req, res, next) => {
    try {
      const token = req.headers.token;
      if (!token) {
        return res.status(400).send({ error: 'no token provided' });
      }
      const user = verifyingToken(token);
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).send({ error: 'Invalid Token' });
    }
  },
  verifyManager: (req, res, next) => {
    try {
      const token = req.headers.token;
      if (!token) {
        return res.status(400).send({ error: 'no token provided' });
      }
      const userToken = verifyingToken(token);
      if (userToken.role !== 'manager') {
        return res.status(403).send({ message: 'User not a manager' });
      }next();
    } catch (error) {
      return res.status(401).send({ error: 'invalid token' });
    }
  }
};

export default authMiddleware;