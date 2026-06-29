const { body } = require("express-validator");

exports.contactRules = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("email").trim().isEmail().withMessage("Valid email required").normalizeEmail(),
  body("subject").trim().notEmpty().isLength({ max: 200 }),
  body("message").trim().notEmpty().isLength({ min: 20, max: 3000 }).withMessage("Message must be 20-3000 chars"),
  body("budget").optional().isIn(["<500","500-2000","2000-5000","5000+","discuss"]),
];
