const ApiError = require("../utils/ApiError");
const logger   = require("../utils/logger");

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, _next) => {
  logger.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors : err.errors,
    });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(e => ({ field: e.path, message: e.message }));
    return res.status(400).json({ success: false, message: "Validation error", errors });
  }

  // Duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ success: false, message: `${field} already exists` });
  }

  // JWT
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  res.status(500).json({ success: false, message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
};
