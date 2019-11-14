const UserModel = require("../models/user.model");
const uuidv1 = require("uuid/v1");

const getAll = async (req, res) => {
  const users = await UserModel.find().exec();

  if (users.length === 0) {
    return res.status(200).send({ message: "No user has signed up" });
  }

  return res.status(200).send(users);
};

const create = (req, res) => {
  const { body } = req;

  if (!Object.keys(body).length)
    return res.status(400).send({ message: "Request Body can not be empty" });

  const { first_name, family_name } = body;
  const id = uuidv1();

  const user = new UserModel({ id, first_name, family_name });

  user
    .save()
    .then(data => res.status(200).send(data))
    .catch(error => res.status(500).send({ message: error.message }));
};

module.exports = { getAll, create };
