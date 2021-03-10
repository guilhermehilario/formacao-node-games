const Users = require("../model/Users");

const bcrypt = require("bcrypt");

exports.create = (req, res) => {
  const salt = bcrypt.genSaltSync(10);

  const { name, email } = req.body;
  const password = bcrypt.hashSync(req.body.password, salt);

  Users.create({ name, email, password })
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res.status(400).json({ message: "Error creating user: ", err })
    );
};

exports.showOne = (req, res) => {
  const { id } = req.params;
  Users.findByPk(id)
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res.status(400).json({ message: "Error listening user: ", err })
    );
};

exports.showAll = (req, res) => {
  Users.findAll()
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res.status(400).json({ message: "Error listening users: ", err })
    );
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Users.destroy({ where: { id } })
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res.status(400).json({ message: "Error delete user", err })
    );
};
