const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title      : { type: String, required: true, trim: true, maxlength: 120 },
  slug       : { type: String, required: true, unique: true, lowercase: true },
  category   : { type: String, enum: ["F1","Automotive","Commercial","GameCinematic","ShortFilm","ProductViz"], required: true },
  description: { type: String, required: true, maxlength: 2000 },
  thumbnail  : { url: String, publicId: String },
  video      : { url: String, publicId: String },
  images     : [{ url: String, publicId: String, caption: String }],
  tools      : [{ type: String }],
  client     : { type: String, default: "Personal" },
  year       : { type: Number, default: () => new Date().getFullYear() },
  featured   : { type: Boolean, default: false },
  order      : { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  metaTitle  : { type: String, maxlength: 60 },
  metaDesc   : { type: String, maxlength: 160 },
}, { timestamps: true });

projectSchema.index({ slug: 1 });
projectSchema.index({ featured: 1, order: 1 });
projectSchema.index({ category: 1 });

module.exports = mongoose.model("Project", projectSchema);
