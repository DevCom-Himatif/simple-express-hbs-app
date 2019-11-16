const UserModel = require("../models/user.model");
const uuidv1 = require("uuid/v1");

const create = async (req, res) => {
  const { body } = req;

  if (!Object.keys(body).length)
    return res.status(400).send({ message: "Request Body can not be empty" });

  const { first_name, family_name } = body;
  let id;
  let isUserExist;

  do {
    id = uuidv1();
    isUserExist = await UserModel.findOne({ first_name });
  } while (isUserExist);

  const user = new UserModel({ id, first_name, family_name });

  user
    .save()
    .then(data => res.status(200).send(data))
    .catch(error => res.status(500).send({ message: error.message }));
};

const getAll = async (req, res) => {
  const users = await UserModel.find().exec();

  if (users.length === 0)
    return res.status(400).send({ message: "No user has signed up" });

  return res.status(200).send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.find({ id });

  if (user.length === 0)
    return res
      .status(400)
      .send({ message: `User with id: ${id} doesn't exists` });

  return res.status(200).send(user);
};

const update = async (req, res) => {
  const {
    body,
    params: { id }
  } = req;

  const updateResult = await UserModel.updateOne({ id }, body);
  const {
    n: numUserFound,
    nModified: numModifiedUser,
    ok: isUpdateSuccessful
  } = updateResult;

  if (numUserFound !== 1)
    return res
      .status(400)
      .send({ message: `User with id: ${id} doesn't exists` });

  if (numModifiedUser < 1)
    return res
      .status(400)
      .send({ message: `Data that you input is the same as the old data` });

  if (!isUpdateSuccessful || numModifiedUser < 1)
    return res
      .status(400)
      .send({ message: `Failed to update user with id: ${id}` });

  return res.status(200).send(updateResult);
};

module.exports = { create, getAll, getOne, update };
