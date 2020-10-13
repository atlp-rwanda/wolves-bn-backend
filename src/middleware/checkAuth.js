import { verifyingToken } from '../utils/jwtToken';

const checkAuth = {
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
};

export default checkAuth;
