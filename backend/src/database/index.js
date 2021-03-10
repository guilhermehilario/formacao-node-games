const Sequelize = require("sequelize");

const connection = new Sequelize({
  dialect: "sqlite",
  storage: "src/database/database.sqlite",
});

module.exports = connection;