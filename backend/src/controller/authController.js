const Users = require("../model/Users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.auth = (req, res) => {
  const { email, password } = req.body;
  const authSe = process.env.SECRET_TOKEN;

  if (email == undefined || password == undefined)
    res.status(404).json({ message: "Please send email and password!" });

  Users.findOne({ where: { email } })
    .then((user) => {
      if (user == null) res.status(404).json({ message: "User not found" });

      const checkPassword = bcrypt.compareSync(password, user.password);

      if (!checkPassword)
        res.status(401).json({ message: "Invalid email or password" });

      jwt.sign(
        { email: user.email },
        authSe,
        { expiresIn: "20h" },
        (err, token) => {
          if (err) res.status(400).json({ message: "Internal error " });
          else res.status(200).json({ token });
        }
      );
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "User not found!!!", error: err.message });
    });
};
