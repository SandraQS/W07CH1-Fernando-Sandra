const { Schema, model } = require("mongoose");

const platformsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Platform = model("Plataforma", platformsSchema, "Plataformas");
module.exports = Platform;
