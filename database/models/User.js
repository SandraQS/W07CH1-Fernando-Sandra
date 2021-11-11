const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  admin: {
    type: Boolean,
    default: false,
  },

  series: {
    type: [Types.ObjectId],
    ref: "Serie",
  },
});

const User = model("Usuario", userSchema, "Usuarios");
module.exports = User;
