const { body } = require("express-validator");

exports.createProjectRules = [
  body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 120 }),
  body("category").notEmpty().isIn(["F1","Automotive","Commercial","GameCinematic","ShortFilm","ProductViz"]),
  body("description").trim().notEmpty().isLength({ max: 2000 }),
];

exports.updateProjectRules = [
  body("title").optional().trim().isLength({ max: 120 }),
  body("category").optional().isIn(["F1","Automotive","Commercial","GameCinematic","ShortFilm","ProductViz"]),
];
