require("dotenv").config();
require("express-async-errors");

const app  = require("./src/app");
const connectDB = require("./src/config/db");
const logger = require("./src/utils/logger");
const { PORT, NODE_ENV } = require("./src/config/env");

// ── Connect DB then start server ──────────────────────────────────────────────
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(() => {
      logger.info("HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT",  () => shutdown("SIGINT"));

  process.on("unhandledRejection", (err) => {
    logger.error("Unhandled Rejection:", err);
    server.close(() => process.exit(1));
  });
});
