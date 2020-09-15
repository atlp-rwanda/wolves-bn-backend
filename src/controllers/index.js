import { User } from "../database/models";

export const createUser = (req, res) => {
    return User.create({
      name: req.body.name,
    })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  };