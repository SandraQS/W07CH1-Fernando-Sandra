const { ValidationError } = require("express-validation");
const debug = require("debug")("series:errors");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "No se encuentra la ruta" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Error de validación";
  }
  debug("¡ERROR! ", error.message);
  const message = error.code ? error.message : "Petó todo";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
