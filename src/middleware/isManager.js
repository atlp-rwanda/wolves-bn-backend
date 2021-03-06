import { verifyingToken } from '../utils/jwtToken';

const isManager = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).send({ error: 'no token provided' });
    }
    const userToken = verifyingToken(token);
    if (userToken.role !== 'manager') {
      return res.status(403).send({ message: 'User is not a manager' });
    }next();
  } catch (error) {
    return res.status(401).send({ error: 'Invalid Token' });
  }
};

export default isManager;