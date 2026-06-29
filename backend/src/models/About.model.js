const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  name       : { type: String, required: true },
  title      : { type: String, required: true },
  tagline    : { type: String },
  bio        : { type: String, required: true },
  avatar     : { url: String, publicId: String },
  resume     : { url: String, publicId: String },
  yearsExp   : { type: Number, default: 0 },
  projectsDone: { type: Number, default: 0 },
  clientCount : { type: Number, default: 0 },
  socials    : {
    artstation : String,
    linkedin   : String,
    youtube    : String,
    instagram  : String,
    email      : String,
  },
  availability: { type: Boolean, default: true },
  isActive    : { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("About", aboutSchema);
