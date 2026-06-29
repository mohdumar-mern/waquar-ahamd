const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name   : { type: String, required: true, trim: true, maxlength: 100 },
  email  : { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, required: true, maxlength: 200 },
  message: { type: String, required: true, maxlength: 3000 },
  budget : { type: String, enum: ["<500","500-2000","2000-5000","5000+","discuss"], default: "discuss" },
  status : { type: String, enum: ["new","read","replied","archived"], default: "new" },
  ip     : { type: String },
}, { timestamps: true });

contactSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Contact", contactSchema);
