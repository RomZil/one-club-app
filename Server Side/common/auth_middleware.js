const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null) {
    return res.sendStatus("401");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send(err.message);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticate;
