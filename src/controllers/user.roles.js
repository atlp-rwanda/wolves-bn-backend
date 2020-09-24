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
      } if (userFound && userFound.role === 'super_admin') {
        return res.status(404).send({ message: 'Either the user is a super admin or not registered' });
      }
      res.status(404).send({ message: 'Either User is a a super admin or not registered' });
      return res;
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}
