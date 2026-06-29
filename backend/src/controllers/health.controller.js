const mongoose = require("mongoose");

exports.check = (req, res) => {
  res.status(200).json({
    status   : "ok",
    timestamp: new Date().toISOString(),
    uptime   : process.uptime(),
    db       : mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    env      : process.env.NODE_ENV,
  });
};
