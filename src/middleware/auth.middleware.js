import { verifyingToken } from '../utils/jwtToken';

const authMiddleware = {
  verifyAdmin: (req, res, next) => {
    const token = req.headers.token;
    const userInfo = verifyingToken(token);
    if (userInfo.role !== 'super_admin') {
      return res.status(403).send({ message: 'User not a super admin' });
    }
    next();
  }
};

export default authMiddleware;