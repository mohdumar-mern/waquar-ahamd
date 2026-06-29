const router   = require("express").Router();
const ctrl     = require("../controllers/contact.controller");
const auth     = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { contactRules } = require("../validators/contact.validator");

router.post("/",         contactRules, validate, ctrl.submit);
router.get("/",     auth, ctrl.getAll);
router.patch("/:id",auth, ctrl.updateStatus);

module.exports = router;
