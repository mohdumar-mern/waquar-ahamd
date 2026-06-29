const { body } = require("express-validator");

exports.skillRules = [
  body("name").trim().notEmpty(),
  body("category").notEmpty().isIn(["Software","Rendering","Animation","VFX","General"]),
  body("level").optional().isInt({ min: 1, max: 100 }),
];
