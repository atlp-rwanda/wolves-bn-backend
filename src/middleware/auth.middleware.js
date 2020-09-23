import models from '../database/models';

const { users } = models;

const authMiddleware = {
  veryfiyUserExist: async (req, res, next) => {
    const user = await users.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).send({ message: 'User not found, please create an account' });
    }
    next();
  },
  verifyAdmin: async (req, res, next) => {
    const userToVerify = req.body;
    const user = await users.findOne({ where: { email: userToVerify.email } });
    if (user.role !== 'super_admin') {
      return res.status(403).send({ message: 'User not a super admin' });
    }
    next();
  }
};

export default authMiddleware;