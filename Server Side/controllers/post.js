const login = async (req, res, next) => {
  console.log(login);
  res.status(400).send({
    status: "fail",
    message: "not implemented",
  });
};

const register = async (req, res, next) => {
  console.log(login);
  res.status(400).send({
    status: "fail",
    message: "not implemented",
  });
};

const logout = async (req, res, next) => {
  console.log(login);
  res.status(400).send({
    status: "fail",
    message: "not implemented",
  });
};

module.exports = {
  login,
  register,
  logout,
};
