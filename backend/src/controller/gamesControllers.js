const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Games = require("../model/Games");

exports.create = (req, res) => {
  const { title, year, price } = req.body;

  Games.create({ title, year, price })
    .then((games) => res.status(201).json({ message: "game created" }))
    .catch((err) =>
      res.status(400).json({ message: "Error creating game: ", err })
    );
};

exports.showOne = (req, res) => {
  const { id } = req.params;

  Games.findByPk(id)
    .then((games) => res.status(200).json(games))
    .catch((err) =>
      res.status(400).json({ message: "Error listed game: ", err })
    );
};

exports.showAll = (req, res) => {
  Games.findAll()
    .then((games) => res.status(200).json(games))
    .catch((err) =>
      res.status(400).json({ message: "Error listing games: ", err })
    );
};

exports.search = (req, res) => {
  const title = req.params.title.split("-").join(" ");
  console.log("Title", title);
  Games.findAll({
    where: { [Op.or]: [{ title: { [Op.like]: `%${title}%` } }] },
  })
    .then((games) => res.status(200).json(games))
    .catch((err) =>
      res.status(400).json({ message: "Error listed game", err })
    );
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { title, year, price } = req.body;

  Games.update({ title, year, price }, { where: { id } })
    .then((games) => res.status(200).json({ message: "game updated", games }))
    .catch((err) =>
      res.status(400).json({ message: "Error update game: ", err })
    );
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Games.destroy({ where: { id } })
    .then((games) => res.status(200).json(games))
    .catch((err) =>
      res.status(400).json({ message: "Error deleted game:", err })
    );
};
