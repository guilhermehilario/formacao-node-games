const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authToken = req.headers["authorization"];
  const authSe = process.env.SECRET_TOKEN;

  if (authToken == undefined)
    res.status(401).json({ message: "Authenticate require" });

  const token = authToken.split(" ")[1];
  jwt.verify(token, authSe, (err, data) => {
    if (err) res.status(401).json({ message: "Authenticate required" });
    else {
      req.user = { email: data.email } / next();
    }
  });
};

module.exports = authentication