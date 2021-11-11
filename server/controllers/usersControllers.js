require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const createUser = async (req, res, next) => {
  try {
    const { name, username, password, admin } = req.body;
    const newUser = await User.create({
      name,
      username,
      password: await bcrypt.hash(password, 10),
      admin,
    });
    res.json(newUser);
  } catch (error) {
    error.code = 400;
    error.message = "Formato no válido";
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      const error = new Error("Algo ha fallado");
      error.code = 401;
      next(error);
    } else {
      const passwordExist = await bcrypt.compare(password, user.password);
      if (!passwordExist) {
        const error = new Error("Algo ha fallado");
        error.code = 401;
        next(error);
      } else {
        const token = jwt.sign({ user, id: user.id }, process.env.SECRET_TOKEN);
        res.json({ token });
      }
    }
  } catch {
    const error = new Error("No autorizado");
    error.code = 401;
    next(error);
  }
};

module.exports = { createUser, loginUser };
