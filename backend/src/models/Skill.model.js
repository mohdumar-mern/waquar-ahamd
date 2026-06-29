const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name      : { type: String, required: true, trim: true },
  category  : { type: String, enum: ["Software","Rendering","Animation","VFX","General"], required: true },
  level     : { type: Number, min: 1, max: 100, default: 80 },
  icon      : { type: String },
  order     : { type: Number, default: 0 },
  isVisible : { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Skill", skillSchema);
