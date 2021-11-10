const chalk = require("chalk");
const mongoose = require("mongoose");
const debug = require("debug")("series:database");

const initDB = (conectionDBString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(conectionDBString, (error) => {
      if (error) {
        debug(chalk.red("No se ha podido conectar con la base de datos"));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.green("Conectado a la base de datos"));
      resolve();
    });
    mongoose.connection.on("close", () => {
      debug(chalk.green("Desconectado de la base de datos"));
    });
  });

module.exports = initDB;
