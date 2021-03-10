require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

const { gamesRoutes, usersRoutes, authRoute } = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/games", gamesRoutes);
app.use("/api/users", usersRoutes);

module.exports = app;
