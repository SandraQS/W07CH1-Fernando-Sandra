const { Schema, model, Types } = require("mongoose");

const serieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  platform: {
    type: Types.ObjectId,
    ref: "Platform",
  },
  viewed: {
    type: Boolean,
    required: true,
  },
});

const Serie = model("Serie", serieSchema);

module.exports = Serie;
