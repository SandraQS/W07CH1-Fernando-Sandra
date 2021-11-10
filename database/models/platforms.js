const { Schema, model, Types } = require("mongoose");

const platformsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  series: {
    type: [Types.ObjectId],
    ref: "Serie",
  },
});

const Platform = model("Plataforma", platformsSchema, "Plataformas");
module.exports = Platform;
