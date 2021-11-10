const bcrypt = require("bcrypt");
const User = require("../../database/models/users");

const createUser = async (req, res) => {
  const { name, username, password, admin } = req.body;

  const newUser = await User.create({
    name,
    username,
    password: await bcrypt.hash(password, 10),
    admin,
  });
  res.json(newUser);
};

module.exports = { createUser };
