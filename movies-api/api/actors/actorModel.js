
const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    character: { type: String},
    movieId: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Actor", actorSchema);
