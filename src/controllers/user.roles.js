import models from '../database/models';

const { users } = models;

const updateUser = (user, userInfo) => users.update(userInfo, {
  where: user,
  returning: true
});

export default class rolesController {
  static async roleController(req, res) {
    try {
      const { userEmail, userRole } = req.body;
      console.log(req.body);
      const userFound = await users.findOne({ where: { email: userEmail } });
      if (userFound && userFound.role !== 'super_admin') {
        await updateUser({ email: userEmail }, { role: userRole });
        return res.status(200).send({ message: 'User role successfully updated' });
      }
      res.status(404).send({ message: 'User not found' });
      return res;
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}