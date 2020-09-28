import { verifyingToken } from '../utils/jwtToken';

const authMiddleware = {
  verifyAdmin: (req, res, next) => {
    try {
      const token = req.headers.token;
      if (!token) {
        return res.status(400).send({ error: 'no token provided' });
      }
      const userToken = verifyingToken(token);
      if (userToken.role !== 'super_admin') {
        return res.status(403).send({ message: 'User not a super admin' });
      }next();
    } catch (error) {
      return res.status(401).send({ error: 'Invalid Token' });
    }
  }
};

export default authMiddleware;