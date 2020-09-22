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
        return res.status(201).send({ message: 'User role successfully updated' });
      }
      return res.status(400).send({ message: 'User is a Super Admin' });
    } catch (error) {
      return res.status(400).send({ error: 'User role not updated' });
    }
  }
}
