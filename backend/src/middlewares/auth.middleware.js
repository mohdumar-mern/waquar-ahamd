const jwt      = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const { JWT_SECRET } = require("../config/env");

module.exports = (req, _res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(ApiError.unauthorized("No token provided"));
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    next(ApiError.unauthorized("Invalid or expired token"));
  }
};
