const required = (key) => {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`);
  return process.env[key];
};

module.exports = {
  NODE_ENV  : process.env.NODE_ENV  || "development",
  PORT      : process.env.PORT      || 5000,
  MONGO_URI : required("MONGO_URI"),
  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "30d",
  CLOUDINARY: {
    CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY    : process.env.CLOUDINARY_API_KEY,
    API_SECRET : process.env.CLOUDINARY_API_SECRET,
  },
  EMAIL: {
    HOST : process.env.SMTP_HOST,
    PORT : process.env.SMTP_PORT || 587,
    USER : process.env.SMTP_USER,
    PASS : process.env.SMTP_PASS,
    FROM : process.env.EMAIL_FROM,
    TO   : process.env.EMAIL_TO,
  },
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || "http://localhost:3000").split(","),
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    MAX      : parseInt(process.env.RATE_LIMIT_MAX)       || 100,
  },
};
