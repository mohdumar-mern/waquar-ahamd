const express    = require("express");
const helmet     = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp        = require("hpp");
const morgan     = require("morgan");
const corsMiddleware = require("./middlewares/cors.middleware");
const rateLimiter    = require("./middlewares/rateLimit.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const routes     = require("./routes/index");
const logger     = require("./utils/logger");

const app = express();

// ── Security middlewares ───────────────────────────────────────────────────────
app.use(helmet());
app.use(corsMiddleware);
app.use(mongoSanitize());
app.use(hpp());

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── HTTP logging ──────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));
}

// ── Rate limiting ─────────────────────────────────────────────────────────────
app.use("/api", rateLimiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api", routes);

// ── Static uploads ────────────────────────────────────────────────────────────
app.use("/uploads", express.static("uploads"));

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
