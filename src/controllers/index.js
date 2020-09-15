import { User } from '../database/models/user';

const createUser = (req, res) => User.create({
  name: req.body.name,
})
  .then((user) => { res.status(201).send(user); })
  .catch((error) => { res.status(400).send(error); });

export default createUser;
