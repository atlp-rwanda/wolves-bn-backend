import { verifyingToken } from '../utils/jwtToken';

const checkAuth = {
  verifyUser: (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).send({ error: 'no token provided' });
    }
    if (token) {
      const redisclient = req.app.get('redis');
      redisclient.get(token, (err, value) => {
        if (value) {
          return res.status(401).send({ message: 'user already logged out' });
        } if (err) {
          return res.send(err);
        }
        try {
          const user = verifyingToken(token);
          req.user = user;
          next();
        } catch (error) {
          return res.status(401).send({ error: 'Invalid Token' });
        }
      });
    }
  },
};

export default checkAuth;
