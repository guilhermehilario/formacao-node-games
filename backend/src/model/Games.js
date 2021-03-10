const sequelize = require("sequelize");
const connection  = require("../database");

const Games = connection.define(
  "games",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: sequelize.DECIMAL,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Games.sync();

module.exports = Games;
