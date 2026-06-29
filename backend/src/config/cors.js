const { ALLOWED_ORIGINS } = require("./env");

module.exports = {
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials   : true,
  methods        : ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders : ["Content-Type","Authorization","X-Requested-With"],
};
