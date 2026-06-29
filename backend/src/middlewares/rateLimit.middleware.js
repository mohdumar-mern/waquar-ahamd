const rateLimit = require("express-rate-limit");
const { RATE_LIMIT } = require("../config/env");

module.exports = rateLimit({
  windowMs: RATE_LIMIT.WINDOW_MS,
  max     : RATE_LIMIT.MAX,
  standardHeaders: true,
  legacyHeaders  : false,
  message: { success: false, message: "Too many requests, please try again later." },
});
