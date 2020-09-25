import { verifyingToken } from '../utils/jwtToken';

const authMiddleware = {
  verifyAdmin: async (req, res, next) => {
    try {
      const token = req.headers.token;
      const userInfo = verifyingToken(token);
      if (userInfo.role !== 'super_admin') {
        return res.status(403).send({ message: 'User not a super admin' });
      }
      next();
    } catch (error) {
      res.status(400).send({ error });
    }
  }
};

export default authMiddleware;